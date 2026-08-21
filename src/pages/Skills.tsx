import { motion, useReducedMotion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { skillGroups } from '@/data/content';

export default function Skills() {
  const reduced = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };

  const badge = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 12 },
    },
  };

  return (
    <section className="py-20 md:py-24">
      <div className="shell">
        <PageHeader index="03" eyebrow="What I reach for" title="Tools of the trade." />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, groupIndex) => (
            <Reveal key={group.label} index={groupIndex} step={0.08}>
              <div className="h-full">
                <h2 className="border-b border-terracotta pb-3 font-display text-xl font-semibold text-teal">
                  <span aria-hidden="true" className="mr-3 text-coral-ink">
                    {String(groupIndex + 1).padStart(2, '0')}
                  </span>
                  {group.label}
                </h2>

                {reduced ? (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="skill-tag">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <motion.ul
                    className="mt-5 flex flex-wrap gap-2"
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                  >
                    {group.items.map((item) => (
                      <motion.li
                        key={item}
                        variants={badge}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="skill-tag"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
