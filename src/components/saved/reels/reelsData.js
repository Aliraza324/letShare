
import avatar from '../../../assets/images/avatar.jpg'
import samraAvatar from '../../../assets/images/samra.jpg'
import fatimaAvatar from '../../../assets/images/fatima.jpg'
import johnAvatar from '../../../assets/images/john.jpg'
import davidAvatar from '../../../assets/images/david.jpg'
import seventhVideo from '../../../assets/videos/seventhVideo.mp4'
import sixthVideo from '../../../assets/videos/sixthVideo.mp4'
import thirdVideo from '../../../assets/videos/thirdVideo.mp4'

export const creators = [
  { name: 'Samra', handle: 'samra.travels', avatar: samraAvatar },
  { name: 'Kris', handle: 'kris56', avatar },
  { name: 'Fatima', handle: 'fatima.frames', avatar: fatimaAvatar },
  { name: 'John', handle: 'john.moves', avatar: johnAvatar },
  { name: 'David', handle: 'david.fit', avatar: davidAvatar },
]

export const initialReels = [
  {
    id: 'reel-1',
    video: seventhVideo,
    creator: creators[1],
    caption:
      'Paradise found on a quiet cliff trail after sunrise. Saved this route for anyone chasing blue water, clean air, and slow mornings.',
    hashtags: ['travel', 'nature', 'adventure'],
    tags: ['Samra', 'Fatima'],
    music: 'Original Sound - kris56',
    postedAt: '12 min ago',
    likes: 12800,
    shares: 927,
    comments: 428,
  },
  {
    id: 'reel-2',
    video: sixthVideo,
    creator: creators[0],
    caption:
      'The little moments between destinations always become the memory. Coffee, wind, windows down, and a saved map full of pins.',
    hashtags: ['roadtrip', 'friends', 'explore'],
    tags: ['Kris'],
    music: 'Weekend Drive - LetShare Audio',
    postedAt: '1 hr ago',
    likes: 9800,
    shares: 581,
    comments: 214,
  },
  {
    id: 'reel-3',
    video: thirdVideo,
    creator: creators[2],
    caption:
      'Golden hour did the heavy lifting here. A tiny behind-the-scenes edit for the photography community.',
    hashtags: ['photography', 'goldenhour', 'creative'],
    tags: ['John', 'David'],
    music: 'Soft Focus - Studio Mix',
    postedAt: '3 hr ago',
    likes: 15700,
    shares: 1300,
    comments: 671,
  },
]

export const initialComments = {
  'reel-1': [
    {
      id: 'c1',
      author: creators[0],
      text: 'That coastline is unreal. Saving this for my next trip.',
      time: '4m',
      likes: 24,
      own: false,
      replies: [
        {
          id: 'r1',
          author: creators[1],
          text: '@Samra you would love the morning trail.',
          time: '2m',
          likes: 8,
          own: false,
        },
      ],
    },
    {
      id: 'c2',
      author: creators[3],
      text: 'The color grade is so clean.',
      time: '9m',
      likes: 11,
      own: false,
      replies: [],
    },
  ],
  'reel-2': [
    {
      id: 'c3',
      author: creators[2],
      text: 'This feels like a whole short film.',
      time: '18m',
      likes: 31,
      own: false,
      replies: [],
    },
  ],
  'reel-3': [
    {
      id: 'c4',
      author: creators[4],
      text: 'The lens flare at the end is perfect.',
      time: '24m',
      likes: 16,
      own: false,
      replies: [],
    },
  ],
}
