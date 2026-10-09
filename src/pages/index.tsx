import React from 'react';
import Layout from '@theme/Layout';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Home"
      description="A free bilingual (English and Urdu) textbook collection and learning platform. The MVP serves ADE and B.Ed(H) students and their teachers, and STEDA teacher-licence aspirants.">
       <main >
        <div className="container margin-vert--xl" style={{ maxWidth: '800px' }}>
          <div className="row">
            <div className="col">
              <h1 className="hero__title text--center margin-bottom--lg">
                <Translate id="home.title">Mega Textbook</Translate>
              </h1>

              <p className="hero__subtitle text--center margin-bottom--xl">
                <Translate id="home.subtitle">
                  A bilingual (English &amp; Urdu) textbook collection and learning platform. The MVP serves ADE and B.Ed(H) students and their teachers, and STEDA teacher-licence aspirants under the Government of Sindh.
                </Translate>
              </p>

              <div className="row margin-bottom--xl">
                <div className="col margin-bottom--lg">
                  <div className="card shadow--md height--100">
                    <div className="card__header">
                      <h3><Translate id="home.textbookTitle">Textbook Collection</Translate></h3>
                    </div>
                    <div className="card__body">
                      <p>
                         <Translate id="home.textbookDesc">
                          Read free bilingual textbooks online — ADE and B.Ed(H) programmes and the STEDA teacher-licence syllabus. Explore semesters, courses, and units in English and Urdu.
                        </Translate>
                      </p>
                    </div>
                    <div className="card__footer">
                      <Link className="button button--primary button--block" to="/intro">
                        <Translate id="home.textbookAction">Browse the Textbooks</Translate>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col margin-bottom--lg">
                  <div className="card shadow--md height--100">
                    <div className="card__header">
                      <h3><Translate id="home.licenceTitle">Licence Exam Preparation</Translate></h3>
                    </div>
                    <div className="card__body">
                      <p>
                        <Translate id="home.licenceDesc">
                          Prepare for the teaching licence exam with the licence track: every syllabus heading explained, free to read, in English and Urdu.
                        </Translate>
                      </p>
                    </div>
                    <div className="card__footer">
                      <Link className="button button--secondary button--block" to="/licence">
                        <Translate id="home.licenceAction">Open the Licence Track</Translate>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text--center margin-bottom--xl">
                <h3><Translate id="home.appTitle">Learning Platform</Translate></h3>
                <p>
                  <Translate id="home.appDesc">
                    Institutions can use our signed-in platform for classes, assignments, submissions, grading, and teacher certification dashboards.
                  </Translate>
                </p>
                <Link className="button button--outline button--primary" to="/app/signup">
                  <Translate id="home.appAction">Sign up for /app/</Translate>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
