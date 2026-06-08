import avatar from '../assets/images/avatar.jpg'
import fatima from '../assets/images/fatima.jpg'
import pinki from '../assets/images/pinki.png'
import hr from '../assets/images/hr.jpg'
import girl from '../assets/images/girl.jpg'

export const stories = [
  { id: 1, type: 'create', title: 'Share moment' },
  { id: 2, image: fatima, avatar, title: 'Fatima' },
  { id: 3, image: girl, avatar, title: 'Creator chat' },
  { id: 4, image: hr, avatar, title: 'Design crew' },
  { id: 5, image: pinki, avatar, title: 'Pinki' },
]

export const suggestedUsers = [
  { id: 1, name: 'Anaya Khan', role: 'Creator' },
  { id: 2, name: 'Jamal Reed', role: 'Photographer' },
  { id: 3, name: 'Sara Kim', role: 'Food lover' },
]

export const feedPosts = [
  {
    id: 1,
    author: 'Sabrina Ali',
    community: 'Travel Lovers',
    content:
      'Found this quiet terrace just before sunset. The city felt like it was breathing slower for once.',
    image: 'from-amber-200 via-orange-300 to-slate-800',
    likes: 124,
    comments: 18,
  },
  {
    id: 2,
    author: 'Marcus Lee',
    community: 'Visual Artists',
    content:
      'Color study from today. Trying to keep the palette loud but the composition calm.',
    image: 'from-fuchsia-400 via-yellow-300 to-cyan-400',
    likes: 89,
    comments: 11,
  },
  {
    id: 3,
    author: 'Nadia Hussain',
    community: 'Creator Circle',
    content:
      'Tiny reminder: ship the rough version. Your future self can polish what your current self actually releases.',
    image: 'from-lime-200 via-emerald-400 to-slate-900',
    likes: 203,
    comments: 34,
  },
]

export const comments = [
  { id: 1, author: 'Ayaan', text: 'This is such a clean idea.' },
  { id: 2, author: 'Mira', text: 'Saved this for later.' },
]
