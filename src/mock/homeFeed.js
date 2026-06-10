import avatar from '../assets/images/avatar.jpg'
import boy from '../assets/images/boy.png'
import david from '../assets/images/david.jpg'
import fatima from '../assets/images/fatima.jpg'
import pinki from '../assets/images/pinki.png'
import hr from '../assets/images/hr.jpg'
import girl from '../assets/images/girl.jpg'
import jannat from '../assets/images/jannat.jpg'
import samra from '../assets/images/samra.jpg'
import thirdVideo from '../assets/videos/thirdVideo.mp4'

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
    author: 'Samra',
    handle: '@samra',
    community: 'Travel Lovers',
    avatar: samra,
    content:
      'Best places to visit this summer? Looking for hidden gems in Europe!',
    image: fatima,
    media: [
      { id: 'post-1-1', type: 'image', src: fatima },
      { id: 'post-1-2', type: 'image', src: girl },
      { id: 'post-1-3', type: 'image', src: hr },
    ],
    likes: '1.2k',
    comments: '342',
    shares: '47',
    time: '2h ago',
    createdAt: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
    visibility: 'Public',
  },
  {
    id: 2,
    author: 'Kriston Watshon',
    handle: '@kriston',
    community: 'Travel Lovers',
    avatar: jannat,
    content:
      'Paradise found! #travel #nature',
    image: hr,
    media: [
      { id: 'post-2-1', type: 'video', src: thirdVideo, thumbnail: hr },
      { id: 'post-2-2', type: 'image', src: jannat },
    ],
    likes: '1.2k',
    comments: '542',
    shares: '89',
    time: '4h ago',
    createdAt: new Date(Date.now() - 4 * 60 * 60000).toISOString(),
    visibility: 'Public',
    isVideo: true,
  },
  {
    id: 3,
    author: 'Nadia Hussain',
    handle: '@nadia',
    community: 'Creator Circle',
    avatar: avatar,
    content:
      'Tiny reminder: ship the rough version. Your future self can polish what your current self actually releases.',
    image: girl,
    media: [
      { id: 'post-3-1', type: 'image', src: girl },
      { id: 'post-3-2', type: 'image', src: pinki },
      { id: 'post-3-3', type: 'image', src: avatar },
      { id: 'post-3-4', type: 'image', src: samra },
      { id: 'post-3-5', type: 'image', src: david },
      { id: 'post-3-6', type: 'image', src: fatima },
    ],
    likes: '203',
    comments: '34',
    shares: '21',
    time: '6h ago',
    createdAt: new Date(Date.now() - 6 * 60 * 60000).toISOString(),
    visibility: 'Public',
  },
]

export const comments = [
  {
    id: 1,
    author: 'Courtney Henry',
    avatar: boy,
    text: 'Ultrices ultricies interdum dolor sodales. Vitae feugiat vitae vitae quis id consectetur.',
    likes: '1.2k',
  },
  {
    id: 2,
    author: 'Ronald Richards',
    avatar: david,
    text: 'Lorem fringilla pretium magna purus orci faucibus morbi.',
    likes: '46',
  },
  {
    id: 3,
    author: 'sarah_l',
    avatar: samra,
    text: 'This is actually insane! Where exactly is this located? I need to go there next summer.',
    likes: '1.2k',
  },
  {
    id: 4,
    author: 'mike_travels',
    avatar: pinki,
    text: 'The color grading on this reel is top notch. What app did you use for the edits?',
    likes: '323',
    liked: true,
  },
  {
    id: 5,
    author: 'ocean_lover',
    avatar: avatar,
    text: 'Simply breathtaking. Nature never fails to amaze.',
    likes: '89',
  },
]
