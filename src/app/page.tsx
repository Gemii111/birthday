'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingGift from '@/components/LandingGift';
import ChildhoodMemories from '@/components/ChildhoodMemories';
import GrowingUp from '@/components/GrowingUp';
import MessagesWall from '@/components/MessagesWall';
import VideoSurprise from '@/components/VideoSurprise';
import CountdownCelebration from '@/components/CountdownCelebration';
import VoiceMessagesWall from '@/components/VoiceMessagesWall';
import LevelUpReveal from '@/components/LevelUpReveal';
import MemoryDrop from '@/components/MemoryDrop';
import ShareCTA from '@/components/ShareCTA';
import { config } from '@/config';

export default function Home() {
  const [giftOpened, setGiftOpened] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!giftOpened && (
          <LandingGift onOpen={() => setGiftOpened(true)} />
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: giftOpened ? 1 : 0 }}
        transition={{ duration: 1 }}
        className={giftOpened ? '' : 'pointer-events-none invisible'}
      >
        <ChildhoodMemories />
        <GrowingUp />
        <MessagesWall />
        <VideoSurprise videoUrl={config.videoUrl} posterUrl={config.posterUrl} />
        <CountdownCelebration birthdayDate={config.birthdayDate} />
        <VoiceMessagesWall />
        <LevelUpReveal age={config.age} />
        <MemoryDrop />
        <ShareCTA />
      </motion.main>
    </>
  );
}
