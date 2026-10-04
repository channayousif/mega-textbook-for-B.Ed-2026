import React, { useState } from 'react';
import { trackEvent } from '@site/src/lib/analytics';
import { getSupabase } from '@site/src/lib/supabase';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function FeedbackWidget() {
  const [submittedHelpful, setSubmittedHelpful] = useState<boolean | null>(null);
  const [comment, setComment] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { pathname } = useLocation();
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;

  const handleHelpfulClick = async (isHelpful: boolean) => {
    if (submittedHelpful !== null) return;
    
    setSubmittedHelpful(isHelpful);
    
    trackEvent('content_rating_submit', {
      rating_value: isHelpful ? 5 : 1,
      content_id: pathname,
    });

    const supabase = await getSupabase();
    if (supabase) {
      await supabase.from('page_feedback').insert({
        page_path: pathname,
        helpful: isHelpful,
        locale,
      });
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const supabase = await getSupabase();
    if (supabase) {
      await supabase.from('page_feedback').insert({
        page_path: pathname,
        helpful: false,
        comment: comment.trim(),
        locale,
      });
    }
    setCommentSubmitted(true);
    setIsSubmitting(false);
  };

  const textYes = locale === 'ur' ? 'ہاں' : 'Yes';
  const textNo = locale === 'ur' ? 'نہیں' : 'No';
  const textQuestion = locale === 'ur' ? 'کیا یہ صفحہ مددگار تھا؟' : 'Was this page helpful?';
  const textImprove = locale === 'ur' ? 'ہم اسے کیسے بہتر بنا سکتے ہیں؟' : 'How can we improve this?';
  const textSubmit = locale === 'ur' ? 'جمع کریں' : 'Submit';
  const textThanks = locale === 'ur' ? 'آپ کے تاثرات کا شکریہ۔' : 'Thanks for your feedback.';

  if (submittedHelpful === true || commentSubmitted) {
    return (
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: '8px', textAlign: 'center' }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>{textThanks}</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{textQuestion}</span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="button button--outline button--primary" 
            onClick={() => handleHelpfulClick(true)}
            disabled={submittedHelpful !== null}
          >
            {textYes}
          </button>
          <button 
            className="button button--outline button--danger" 
            onClick={() => handleHelpfulClick(false)}
            disabled={submittedHelpful !== null}
          >
            {textNo}
          </button>
        </div>
      </div>

      {submittedHelpful === false && !commentSubmitted && (
        <form onSubmit={handleCommentSubmit} style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-700)' }}>{textImprove}</label>
          <textarea 
            value={comment}
            onChange={e => setComment(e.target.value)}
            maxLength={250}
            rows={3}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--ifm-color-emphasis-300)' }}
          />
          <button 
            type="submit" 
            className="button button--primary" 
            disabled={!comment.trim() || isSubmitting}
            style={{ alignSelf: 'flex-start' }}
          >
            {textSubmit}
          </button>
        </form>
      )}
    </div>
  );
}
