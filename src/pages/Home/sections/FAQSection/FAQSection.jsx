import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import content from '../../../../locales/en.json'
import './FAQSection.css'
import { fadeUp, staggerContainer, viewportOnce } from '../../../../utils/motionVariants'

const { faq } = content

const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <motion.div
    className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
    variants={fadeUp}
  >
    <button className="faq-item__question" onClick={onToggle}>
      <span>{question}</span>
      <motion.span
        className="faq-item__icon"
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <i className="fa-regular fa-circle-down" />
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          className="faq-item__answer-wrap"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          <div className="faq-item__answer-inner">
            <p className="faq-item__answer">{answer}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
)

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(1)

  const toggle = (idx) => setOpenIdx((prev) => (prev === idx ? -1 : idx))

  return (
    <section className="faq section">
      <div className="container">
        <motion.div
          className="faq__header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h2 className="faq__title">FAQ'S</h2>
          <div className="faq__underline"></div>
        </motion.div>

        <motion.div
          className="faq__list"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {faq.items.map((item, idx) => (
            <FAQItem
              key={idx}
              index={idx}
              question={item.question}
              answer={item.answer}
              isOpen={openIdx === idx}
              onToggle={() => toggle(idx)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FAQSection
