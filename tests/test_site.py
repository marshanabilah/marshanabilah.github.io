"""Smoke tests for the generated portfolio site."""

from __future__ import annotations

import os
import subprocess
import tempfile
import unittest
from html.parser import HTMLParser
from pathlib import Path


REPOSITORY_ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIRECTORY = REPOSITORY_ROOT / "src"
FORMSPREE_ENDPOINT = "https://formspree.io/f/xaeqoakn"


class PageParser(HTMLParser):
    """Collect the small subset of HTML attributes needed by these tests."""

    def __init__(self) -> None:
        super().__init__()
        self.anchors: list[dict[str, str]] = []
        self.forms: list[dict[str, str]] = []
        self.inputs: list[dict[str, str]] = []
        self.textareas: list[dict[str, str]] = []
        self.buttons: list[dict[str, str]] = []
        self.status_regions: list[dict[str, str]] = []

    def handle_starttag(
        self, tag: str, attributes: list[tuple[str, str | None]]
    ) -> None:
        attrs = {name: value or "" for name, value in attributes}
        if tag == "a":
            self.anchors.append(attrs)
        elif tag == "form":
            self.forms.append(attrs)
        elif tag == "input":
            self.inputs.append(attrs)
        elif tag == "textarea":
            self.textareas.append(attrs)
        elif tag == "button":
            self.buttons.append(attrs)
        if attrs.get("role") == "status":
            self.status_regions.append(attrs)


class PortfolioSiteTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.temporary_directory = tempfile.TemporaryDirectory()
        cls.site_directory = Path(cls.temporary_directory.name)

        environment = os.environ.copy()
        environment.setdefault("JEKYLL_ENV", "test")
        result = subprocess.run(
            [
                "bundle",
                "exec",
                "jekyll",
                "build",
                "--destination",
                str(cls.site_directory),
            ],
            cwd=SOURCE_DIRECTORY,
            env=environment,
            capture_output=True,
            text=True,
            check=False,
        )
        if result.returncode != 0:
            raise RuntimeError(
                "Jekyll build failed before the tests could run.\n"
                f"stdout:\n{result.stdout}\n"
                f"stderr:\n{result.stderr}"
            )

    @classmethod
    def tearDownClass(cls) -> None:
        cls.temporary_directory.cleanup()

    def read_page(self, relative_path: str) -> str:
        return (self.site_directory / relative_path).read_text(encoding="utf-8")

    def parse_page(self, relative_path: str) -> PageParser:
        parser = PageParser()
        parser.feed(self.read_page(relative_path))
        return parser

    def test_homepage_lists_current_projects_as_in_progress(self) -> None:
        homepage = self.read_page("index.html")

        self.assertIn("Sales Telegram Bot", homepage)
        self.assertIn("Gmail Expense Tracker", homepage)
        self.assertEqual(homepage.count("In progress"), 2)

    def test_contact_form_has_required_fields_and_endpoint(self) -> None:
        contact_page = self.parse_page("contact/index.html")

        self.assertTrue(
            any(
                form.get("action") == FORMSPREE_ENDPOINT
                and form.get("method", "").lower() == "post"
                for form in contact_page.forms
            )
        )
        required_inputs = {
            field.get("name")
            for field in contact_page.inputs
            if "required" in field
        }
        required_textareas = {
            field.get("name")
            for field in contact_page.textareas
            if "required" in field
        }
        self.assertEqual(required_inputs, {"name", "email"})
        self.assertEqual(required_textareas, {"message"})
        self.assertTrue(
            any(button.get("type") == "submit" for button in contact_page.buttons)
        )

    def test_contact_form_exposes_accessible_status_updates(self) -> None:
        contact_page = self.parse_page("contact/index.html")

        self.assertTrue(
            any(
                region.get("aria-live") == "polite"
                for region in contact_page.status_regions
            )
        )

    def test_internal_contact_links_do_not_open_an_email_client(self) -> None:
        generated_pages = list(self.site_directory.rglob("*.html"))
        self.assertTrue(generated_pages)

        contact_links = 0
        for page_path in generated_pages:
            page = page_path.read_text(encoding="utf-8")
            self.assertNotIn("mailto:", page, msg=f"Found mailto link in {page_path}")

            parser = PageParser()
            parser.feed(page)
            contact_links += sum(
                anchor.get("href") == "/contact/" for anchor in parser.anchors
            )

        self.assertGreater(contact_links, 0)


if __name__ == "__main__":
    unittest.main()
