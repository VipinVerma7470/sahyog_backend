import { ShieldCheck, LockKeyhole, Database, Mail, UserCheck } from "lucide-react";

import "./PrivacyPolicy.css";

function PrivacyPolicy() {
  return (
    <div className="legal-page">

      {/* HERO */}
      {/* <section className="legal-hero">
        <div className="legal-hero-inner">

          <span className="legal-kicker">
            <span></span>
            PRIVACY &amp; DATA
          </span>

          <h1>
            Privacy
            <br />
            <em>Policy.</em>
          </h1>

          <p>
            Your privacy matters to us. This policy explains how Sahyog
            Welfare Foundation collects, uses and protects information
            shared through our website.
          </p>

          <div className="legal-updated">
            Last updated: September 2026
          </div>

        </div>

        <div className="legal-hero-card">
          <div className="legal-card-icon">
            <ShieldCheck size={28} />
          </div>

          <span>YOUR PRIVACY</span>

          <h3>
            Information should be
            <br />
            handled with care.
          </h3>

          <p>
            We aim to keep the information you share with us secure
            and use it responsibly.
          </p>
        </div>
      </section> */}


      {/* CONTENT */}
      <section className="legal-content-section">

        <div className="legal-content">

          {/* INTRO */}
          <div className="legal-intro">
            <span className="legal-section-number">01</span>

            <div>
              <span className="legal-content-kicker">
                INTRODUCTION
              </span>

              <h2>
                How we respect
                <br />
                <em>your information.</em>
              </h2>

              <p>
                Sahyog Welfare Foundation respects the privacy of visitors,
                volunteers, donors, beneficiaries and other individuals
                who interact with our website.
              </p>

              <p>
                This Privacy Policy describes the general manner in which
                information may be collected and used when you visit our
                website, contact us, participate in our programs or submit
                information through our online forms.
              </p>
            </div>
          </div>


          {/* QUICK CARDS */}
          <div className="legal-info-grid">

            <div className="legal-info-card">
              <div className="legal-info-icon">
                <Database size={20} />
              </div>

              <h3>Information we collect</h3>

              <p>
                Information you voluntarily provide through contact,
                volunteer, donation or other website forms.
              </p>
            </div>


            <div className="legal-info-card">
              <div className="legal-info-icon">
                <LockKeyhole size={20} />
              </div>

              <h3>How we protect it</h3>

              <p>
                We take reasonable measures to protect information
                against unauthorised access, misuse or disclosure.
              </p>
            </div>


            <div className="legal-info-card">
              <div className="legal-info-icon">
                <UserCheck size={20} />
              </div>

              <h3>Your choices</h3>

              <p>
                You may contact us regarding information you have
                provided and request clarification about its use.
              </p>
            </div>

          </div>


          {/* SECTION 02 */}
          <article className="legal-article">

            <span className="legal-article-number">02</span>

            <div>
              <h3>Information We May Collect</h3>

              <p>
                Depending on how you interact with our website, we may
                receive information such as:
              </p>

              <ul>
                <li>Your name and contact details.</li>
                <li>Email address and phone number.</li>
                <li>Information submitted through contact or enquiry forms.</li>
                <li>Volunteer or participation-related information.</li>
                <li>Donation-related information when applicable.</li>
                <li>Messages, feedback or other information you choose to share.</li>
              </ul>
            </div>

          </article>


          {/* SECTION 03 */}
          <article className="legal-article">

            <span className="legal-article-number">03</span>

            <div>
              <h3>How We Use Information</h3>

              <p>
                Information provided to us may be used for purposes such as:
              </p>

              <ul>
                <li>Responding to enquiries and requests.</li>
                <li>Communicating with volunteers, donors and participants.</li>
                <li>Providing information about our programs and activities.</li>
                <li>Improving our website and services.</li>
                <li>Maintaining records related to our activities.</li>
                <li>Supporting the administration of our programs.</li>
              </ul>

            </div>

          </article>


          {/* SECTION 04 */}
          <article className="legal-article">

            <span className="legal-article-number">04</span>

            <div>
              <h3>Cookies &amp; Website Information</h3>

              <p>
                Our website may use cookies or similar technologies to
                support website functionality, understand general website
                usage and improve the visitor experience.
              </p>

              <p>
                Your browser may allow you to control or disable cookies.
                Disabling certain cookies may affect some website
                functionality.
              </p>
            </div>

          </article>


          {/* SECTION 05 */}
          <article className="legal-article">

            <span className="legal-article-number">05</span>

            <div>
              <h3>Information Sharing</h3>

              <p>
                We do not intend to sell personal information submitted
                through our website.
              </p>

              <p>
                Information may be shared with authorised service
                providers or other parties where reasonably necessary
                to operate our website, process a requested service,
                maintain records, comply with applicable requirements,
                or protect the rights and safety of the organisation
                and others.
              </p>
            </div>

          </article>


          {/* SECTION 06 */}
          <article className="legal-article">

            <span className="legal-article-number">06</span>

            <div>
              <h3>Data Security</h3>

              <p>
                We take reasonable administrative and technical measures
                to safeguard information provided to us. However, no
                method of transmission or storage over the internet can
                be guaranteed to be completely secure.
              </p>
            </div>

          </article>


          {/* SECTION 07 */}
          <article className="legal-article">

            <span className="legal-article-number">07</span>

            <div>
              <h3>Third-Party Websites</h3>

              <p>
                Our website may contain links to third-party websites,
                social media platforms or external services. Sahyog
                Welfare Foundation is not responsible for the privacy
                practices or content of those external websites.
              </p>

              <p>
                We recommend reviewing the privacy policies of external
                websites before providing them with personal information.
              </p>
            </div>

          </article>


          {/* SECTION 08 */}
          <article className="legal-article">

            <span className="legal-article-number">08</span>

            <div>
              <h3>Children's Information</h3>

              <p>
                Our programs may involve activities intended to support
                children and communities. Any information concerning
                children should be shared through appropriate authorised
                channels and only where there is a legitimate need to
                provide it.
              </p>
            </div>

          </article>


          {/* SECTION 09 */}
          <article className="legal-article">

            <span className="legal-article-number">09</span>

            <div>
              <h3>Changes to This Policy</h3>

              <p>
                We may update this Privacy Policy from time to time to
                reflect changes in our website, activities or practices.
                Any updated version will be published on this page with
                a revised date.
              </p>
            </div>

          </article>


          {/* CONTACT */}
          <div className="legal-contact-card">

            <div className="legal-contact-icon">
              <Mail size={21} />
            </div>

            <div>
              <span>QUESTIONS ABOUT PRIVACY?</span>

              <h3>We're here to help.</h3>

              <p>
                If you have questions about this Privacy Policy or
                information you have shared with us, please contact
                Sahyog Welfare Foundation.
              </p>

              <a href="mailto:rajkumarvishwakarma675@gmail.com">
                rajkumarvishwakarma675@gmail.com
              </a>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

export default PrivacyPolicy;