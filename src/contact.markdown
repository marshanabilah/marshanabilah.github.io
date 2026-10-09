---
layout: page
title: Contact
description: Send me a message about an AI, data, or engineering opportunity.
background: /img/bg-contact.jpg
permalink: /contact/
---

<div class="contact-page">
  <section class="contact-intro" aria-labelledby="contact-form-heading">
    <p class="eyebrow">Start a conversation</p>
    <h2 id="contact-form-heading">Tell me what you’re working on.</h2>
    <p>Share a little about the opportunity, project, or research question. I’ll reply to the email address you provide.</p>
  </section>

  <form class="contact-form" id="contactForm" action="{{ site.contact_form_endpoint }}" method="POST">
    <div class="form-field">
      <label for="name">Name</label>
      <input id="name" name="name" type="text" autocomplete="name" required>
    </div>

    <div class="form-field">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" autocomplete="email" required>
    </div>

    <div class="form-field">
      <label for="message">Message</label>
      <textarea id="message" name="message" rows="7" required></textarea>
    </div>

    <input type="hidden" name="_subject" value="New portfolio contact">
    <div class="form-honeypot" aria-hidden="true">
      <label for="company-website">Leave this field empty</label>
      <input id="company-website" name="_gotcha" type="text" tabindex="-1" autocomplete="off">
    </div>

    <div class="contact-form-footer">
      <button class="btn btn-primary" id="sendMessageButton" type="submit">Send message</button>
      <p class="form-status" id="formStatus" role="status" aria-live="polite"></p>
    </div>

    <p class="form-privacy">Form submissions are processed by Formspree and delivered to my email.</p>
  </form>
</div>
