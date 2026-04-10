import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import content from '../../../../locales/en.json'
import SectionTitle from '../../../../components/ui/SectionTitle/SectionTitle'
import Button from '../../../../components/ui/Button/Button'
import './FAQSection.css'
import { fadeUp, staggerContainer, viewportOnce } from '../../../../utils/motionVariants'

const { faq } = content

const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <motion.div
    className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
    variants={fadeUp}
  >
    <button className="faq-item__question" onClick={onToggle} aria-expanded={isOpen}>
      <span className="faq-item__q-text">{question}</span>
      <motion.span
        className="faq-item__icon"
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <i className="fa-solid fa-plus" />
      </motion.span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.32, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          <p className="faq-item__answer">{answer}</p>
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
        <div className="faq__layout">

          {/* ── Left: intro ── */}
          <motion.div
            className="faq__intro"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <SectionTitle
              label={faq.label}
              heading={faq.heading}
              subheading={faq.subheading}
              align="left"
            />
            <p className="faq__contact-note">Still have questions?</p>
            <Button href="/contact" variant="link" className="faq__contact-link">
              Talk to our experts
              <i className="fa-solid fa-arrow-right" />
            </Button>
          </motion.div>

          {/* ── Right: accordion ── */}
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
                question={item.question}
                answer={item.answer}
                isOpen={openIdx === idx}
                onToggle={() => toggle(idx)}
              />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default FAQSection
