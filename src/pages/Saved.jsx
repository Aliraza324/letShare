import { motion } from 'framer-motion'
import MainLayout from '../layouts/MainLayout'
import SavedOverviewSection from '../components/saved/SavedOverviewSection'
import SavedPostsSection from '../components/saved/SavedPostsSection'
import SavedReelsSection from '../components/saved/SavedReelsSection'
import { fadeUp, staggerContainer } from '../animations/animation'

const Saved = () => {
  return (
    <MainLayout>
      <motion.div
        className="space-y-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp}>
          <SavedOverviewSection />
        </motion.div>
        <motion.div variants={fadeUp}>
          <SavedReelsSection />
        </motion.div>
        <motion.div variants={fadeUp}>
          <SavedPostsSection />
        </motion.div>
      </motion.div>
    </MainLayout>
  )
}

export default Saved
