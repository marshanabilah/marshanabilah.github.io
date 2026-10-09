# Marsha Nabilah Wibowo — Portfolio

Personal software-development portfolio built with Jekyll and deployed to GitHub Pages.

## Local development

```bash
cd src
bundle install
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`.

## Testing

The test suite builds the Jekyll site in a temporary directory and checks that:

- the Sales Telegram Bot and Gmail Expense Tracker are shown as in progress;
- the contact form uses the configured Formspree endpoint;
- the name, email, and message fields are required;
- form status updates are accessible to screen readers; and
- contact links open the contact page instead of an email application.

Run the tests from the repository root:

```bash
python3 -m unittest discover -s tests -v
```

The tests use Python's standard library, so they do not require additional Python packages. The existing Ruby dependencies must be installed because the suite runs `bundle exec jekyll build` before checking the generated pages.

## Deployment

Pushes to `main` are built from the `src` directory and deployed through the GitHub Pages workflow in `.github/workflows/pages.yml`.
