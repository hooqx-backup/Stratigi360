import { useState } from 'react'
import content from '../../../../locales/en.json'
import './FAQSection.css'

const { faq } = content

const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
    <button className="faq-item__question" onClick={onToggle}>
      <span>{question}</span>
      <span className="faq-item__icon">
        <i className={`fa-regular ${isOpen ? 'fa-circle-up' : 'fa-circle-down'}`} />
      </span>
    </button>
    <div className="faq-item__answer-wrap">
      <div className="faq-item__answer-inner">
        <p className="faq-item__answer">{answer}</p>
      </div>
    </div>
  </div>
)

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(1) // Setting 1 as default open like your image

  const toggle = (idx) => setOpenIdx((prev) => (prev === idx ? -1 : idx))

  return (
    <section className="faq section">
      <div className="container">
        {/* Centered Header */}
        <div className="faq__header">
          <h2 className="faq__title">FAQ'S</h2>
          <div className="faq__underline"></div>
        </div>

        <div className="faq__list">
          {faq.items.map((item, idx) => (
            <FAQItem
              key={idx}
              question={item.question}
              answer={item.answer}
              isOpen={openIdx === idx}
              onToggle={() => toggle(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection