const topics = {
  '🌏 World Affairs': [
    '🌦 Climate',
    '📰 Current Affairs',
    '🧮 Markets',
    '🇺🇸 U.S. Politics',
    '👥 Social Issues',
    '🌏 Geopolitics',
    '🏭 Economics'
  ],
  '🗺 Places': [
    '🌁 San Francisco',
    '🇳🇬 Nigeria',
    '🗽 New York',
    '🇮🇳 India',
    '🇬🇧 London',
    '🌅 Los Angeles',
    '🇫🇷 Paris',
    '🍑 Atlanta',
    '🌍 Africa'
  ],
  '🔥 Hustle': [
    '📎 Small Business',
    '🏛 Stocks',
    '🌈 Instagram',
    '🌱 Networking',
    '🎯 Pitch Practice',
    '🏹 Entrepreneurship',
    '👋 Clubhouse',
    '🎵 Tik Tok',
    '🏡 Real Estate'
  ],
  '🏆 Sports': [
    '🚲 Cycling',
    '🥋 MMA',
    '⚽️ Soccer',
    '⚾️ Baseball',
    '🏎 Formula 1',
    '⛳️ Golf',
    '🏈 Football',
    '🏀 Basketball',
    '🎾 Tennis',
    '🏏 Cricket'
  ],
  '💡Knowledge': [
    '🧀 Psychology',
    '🦠 Covid-19',
    '🔬 Science',
    '🛰 Space',
    '🍏 Education',
    '🎱 Math',
    '🌳 Philosophy',
    '🧲 Physics',
    '⏳ The Future',
    '🧬 Biology',
    '🗿 History'
  ],
  '🗣 Identity': [
    '💚 Indigenous',
    '🧨 Baby Boomers',
    '♿️ Disabled',
    '💙 South Asian',
    '❤️ BIPOC',
    '😴 Gen Z',
    '👭Women',
    '💜 East Asian',
    '👻 Millennials',
    '👖 Gen X',
    '💛 Latino',
    '🧡 Black',
    '🏳️&zwj;🌈 LGBTQ'
  ],
  '💭 Arts': [
    '💃🏽 Dance',
    '🍣 Food &amp; Drink',
    '📚 Books',
    '🎭 Theater',
    '🛸 Sci-Fi',
    '🌊 Art',
    '📐 Architecture',
    '👘 Fashion',
    '💈 Advertising',
    '📖 Writing',
    '🤯 Burning Man',
    '💋 Beauty',
    '🎏 Design',
    '📷 Photography'
  ],
  '🎸 Entertainment': [
    '👄 Celebreties',
    '🙊 Comedy',
    '☕️ Advice',
    '🎧 Music',
    '💥 Fun',
    '🎤 Karaoke',
    '😸 Anime &amp; Manga',
    '💯 Variety',
    '🎫 Performances',
    '📺 Television',
    '🎙 Storytelling',
    '🕹 Gaming',
    '📻 Podcasts',
    '🙋🏿&zwj;♀️ Trivia',
    '🎞 Movies'
  ],
  '🕊 Faith': [
    '🕌 Islam',
    '🕍 Judaism',
    '🕯 Spirituality',
    '👣 Taoism',
    '❓ Agnosticism',
    '🚩 Sikhism',
    '📿 Buddhism',
    '🛕 Hinduism',
    '⛪️ Christianity',
    '🪐 Atheism'
  ],
  '🧭 Tech': [
    '🍕 Engineering',
    '🥽 VR/AR',
    '💰 Venture Capital',
    '☁️ SaaS',
    '🐇 Crypto',
    '🦄 Startups',
    '📱 Product',
    '💵 Angel Investing',
    '🧠 AI',
    '📈 Marketing',
    '🛍 DTC'
  ],
  '🥳 Hanging Out': [
    '✨ Meet People',
    '🦙 ¯_(ツ)_/¯',
    '👩&zwj;💻 Coworking',
    '🌙 Late Night',
    '🧊 Chill Vibes',
    '🎉 Welcome Newbies',
    '🍷 Bring a Drink',
    '🌀 PTR'
  ],
  '💬 Languages': [
    '🇪🇸 Spanish',
    '🇩🇪 German',
    '🇨🇳 Mandarin',
    '🇷🇺 Russian',
    '🇯🇵 Japanese',
    '🇮🇩 Indonesian',
    '🇵🇾 Arabic',
    '🇧🇷 Portuguese',
    '🇫🇷 French',
    '🇮🇳 Hindi'
  ],
  '🌿 Wellness': [
    '🧘🏻&zwj;♀️ Meditation',
    '⛺️ Outdoors',
    '🍎 Health',
    '🌽 Nutrition',
    '💊 Medicine',
    '🥕 Veganism',
    '🏋🏿&zwj;♀️ Weights',
    '🏃&zwj;♂️ Fitness',
    '🍃 Mindfulness',
    '🍓 Psychedelics'
  ],
  '🌻 Life': [
    '🧸 Parenting',
    '💍 Weddings',
    '🐣 Pregnancy',
    '🧶 Relationships',
    '✈️ Traveling',
    '💸 Grownuping',
    '💘 Dating',
    '☕️ Support'
  ]
}

const categories = [
  '🌏 World Affairs',
  '🗺 Places',
  '🔥 Hustle',
  '🏆 Sports',
  '💡Knowledge',
  '🗣 Identity',
  '💭 Arts',
  '🎸 Entertainment',
  '🕊 Faith',
  '🧭 Tech',
  '🥳 Hanging Out',
  '💬 Languages',
  '🌿 Wellness',
  '🌻 Life'
]

const podcastCategories = [
  {
    "value": "Arts",
    "display": "Arts",
    "subCategories": [
      {
        "value": "Arts|Books",
        "display": "Books"
      },
      {
        "value": "Arts|Design",
        "display": "Design"
      },
      {
        "value": "Arts|Fashion & Beauty",
        "display": "Fashion & Beauty"
      },
      {
        "value": "Arts|Food",
        "display": "Food"
      },
      {
        "value": "Arts|Performing Arts",
        "display": "Performing Arts"
      },
      {
        "value": "Arts|Visual Arts",
        "display": "Visual Arts"
      }
    ]
  },
  {
    "value": "Business",
    "display": "Business",
    "subCategories": [
      {
        "value": "Business|Careers",
        "display": "Careers"
      },
      {
        "value": "Business|Entrepreneurship",
        "display": "Entrepreneurship"
      },
      {
        "value": "Business|Investing",
        "display": "Investing"
      },
      {
        "value": "Business|Management",
        "display": "Management"
      },
      {
        "value": "Business|Marketing",
        "display": "Marketing"
      },
      {
        "value": "Business|Non-Profit",
        "display": "Non-Profit"
      }
    ]
  },
  {
    "value": "Comedy",
    "display": "Comedy",
    "subCategories": [
      {
        "value": "Comedy|Comedy Interviews",
        "display": "Comedy Interviews"
      },
      {
        "value": "Comedy|Improv",
        "display": "Improv"
      },
      {
        "value": "Comedy|Stand-Up",
        "display": "Stand-Up"
      }
    ]
  },
  {
    "value": "Education",
    "display": "Education",
    "subCategories": [
      {
        "value": "Education|Courses",
        "display": "Courses"
      },
      {
        "value": "Education|How To",
        "display": "How To"
      },
      {
        "value": "Education|Language Learning",
        "display": "Language Learning"
      },
      {
        "value": "Education|Self-Improvement",
        "display": "Self-Improvement"
      }
    ]
  },
  {
    "value": "Fiction",
    "display": "Fiction",
    "subCategories": [
      {
        "value": "Fiction|Comedy Fiction",
        "display": "Comedy Fiction"
      },
      {
        "value": "Fiction|Drama",
        "display": "Drama"
      },
      {
        "value": "Fiction|Science Fiction",
        "display": "Science Fiction"
      }
    ]
  },
  {
    "value": "Government",
    "display": "Government"
  },
  {
    "value": "History",
    "display": "History"
  },
  {
    "value": "Health & Fitness",
    "display": "Health & Fitness",
    "subCategories": [
      {
        "value": "Health & Fitness|Alternative Health",
        "display": "Alternative Health"
      },
      {
        "value": "Health & Fitness|Fitness",
        "display": "Fitness"
      },
      {
        "value": "Health & Fitness|Medicine",
        "display": "Medicine"
      },
      {
        "value": "Health & Fitness|Mental Health",
        "display": "Mental Health"
      },
      {
        "value": "Health & Fitness|Nutrition",
        "display": "Nutrition"
      },
      {
        "value": "Health & Fitness|Sexuality",
        "display": "Sexuality"
      }
    ]
  },
  {
    "value": "Kids & Family",
    "display": "Kids & Family",
    "subCategories": [
      {
        "value": "Kids & Family|Education for Kids",
        "display": "Education for Kids"
      },
      {
        "value": "Kids & Family|Parenting",
        "display": "Parenting"
      },
      {
        "value": "Kids & Family|Pets & Animals",
        "display": "Pets & Animals"
      },
      {
        "value": "Kids & Family|Stories for Kids",
        "display": "Stories for Kids"
      }
    ]
  },
  {
    "value": "Leisure",
    "display": "Leisure",
    "subCategories": [
      {
        "value": "Leisure|Animation & Manga",
        "display": "Animation & Manga"
      },
      {
        "value": "Leisure|Automotive",
        "display": "Automotive"
      },
      {
        "value": "Leisure|Aviation",
        "display": "Aviation"
      },
      {
        "value": "Leisure|Crafts",
        "display": "Crafts"
      },
      {
        "value": "Leisure|Games",
        "display": "Games"
      },
      {
        "value": "Leisure|Hobbies",
        "display": "Hobbies"
      },
      {
        "value": "Leisure|Home & Garden",
        "display": "Home & Garden"
      },
      {
        "value": "Leisure|Video Games",
        "display": "Video Games"
      }
    ]
  },
  {
    "value": "Music",
    "display": "Music",
    "subCategories": [
      {
        "value": "Music|Music Commentary",
        "display": "Music Commentary"
      },
      {
        "value": "Music|Music History",
        "display": "Music History"
      },
      {
        "value": "Music|Music Interviews",
        "display": "Music Interviews"
      }
    ]
  },
  {
    "value": "News",
    "display": "News",
    "subCategories": [
      {
        "value": "News|Business News",
        "display": "Business News"
      },
      {
        "value": "News|Daily News",
        "display": "Daily News"
      },
      {
        "value": "News|Entertainment News",
        "display": "Entertainment News"
      },
      {
        "value": "News|News Commentary",
        "display": "News Commentary"
      },
      {
        "value": "News|Politics",
        "display": "Politics"
      },
      {
        "value": "News|Sports News",
        "display": "Sports News"
      },
      {
        "value": "News|Tech News",
        "display": "Tech News"
      }
    ]
  },
  {
    "value": "Religion & Spirituality",
    "display": "Religion & Spirituality",
    "subCategories": [
      {
        "value": "Religion & Spirituality|Buddhism",
        "display": "Buddhism"
      },
      {
        "value": "Religion & Spirituality|Christianity",
        "display": "Christianity"
      },
      {
        "value": "Religion & Spirituality|Hinduism",
        "display": "Hinduism"
      },
      {
        "value": "Religion & Spirituality|Islam",
        "display": "Islam"
      },
      {
        "value": "Religion & Spirituality|Judaism",
        "display": "Judaism"
      },
      {
        "value": "Religion & Spirituality|Religion",
        "display": "Religion"
      },
      {
        "value": "Religion & Spirituality|Spirituality",
        "display": "Spirituality"
      }
    ]
  },
  {
    "value": "Science",
    "display": "Science",
    "subCategories": [
      {
        "value": "Science|Astronomy",
        "display": "Astronomy"
      },
      {
        "value": "Science|Chemistry",
        "display": "Chemistry"
      },
      {
        "value": "Science|Earth Sciences",
        "display": "Earth Sciences"
      },
      {
        "value": "Science|Life Sciences",
        "display": "Life Sciences"
      },
      {
        "value": "Science|Mathematics",
        "display": "Mathematics"
      },
      {
        "value": "Science|Natural Sciences",
        "display": "Natural Sciences"
      },
      {
        "value": "Science|Nature",
        "display": "Nature"
      },
      {
        "value": "Science|Physics",
        "display": "Physics"
      },
      {
        "value": "Science|Social Sciences",
        "display": "Social Sciences"
      }
    ]
  },
  {
    "value": "Society & Culture",
    "display": "Society & Culture",
    "subCategories": [
      {
        "value": "Society & Culture|Documentary",
        "display": "Documentary"
      },
      {
        "value": "Society & Culture|Personal Journals",
        "display": "Personal Journals"
      },
      {
        "value": "Society & Culture|Philosophy",
        "display": "Philosophy"
      },
      {
        "value": "Society & Culture|Places & Travel",
        "display": "Places & Travel"
      },
      {
        "value": "Society & Culture|Relationships",
        "display": "Relationships"
      }
    ]
  },
  {
    "value": "Sports",
    "display": "Sports",
    "subCategories": [
      {
        "value": "Sports|Baseball",
        "display": "Baseball"
      },
      {
        "value": "Sports|Basketball",
        "display": "Basketball"
      },
      {
        "value": "Sports|Cricket",
        "display": "Cricket"
      },
      {
        "value": "Sports|Fantasy Sports",
        "display": "Fantasy Sports"
      },
      {
        "value": "Sports|Football",
        "display": "Football"
      },
      {
        "value": "Sports|Golf",
        "display": "Golf"
      },
      {
        "value": "Sports|Hockey",
        "display": "Hockey"
      },
      {
        "value": "Sports|Rugby",
        "display": "Rugby"
      },
      {
        "value": "Sports|Running",
        "display": "Running"
      },
      {
        "value": "Sports|Soccer",
        "display": "Soccer"
      },
      {
        "value": "Sports|Swimming",
        "display": "Swimming"
      },
      {
        "value": "Sports|Tennis",
        "display": "Tennis"
      },
      {
        "value": "Sports|Volleyball",
        "display": "Volleyball"
      },
      {
        "value": "Sports|Wilderness",
        "display": "Wilderness"
      },
      {
        "value": "Sports|Wrestling",
        "display": "Wrestling"
      }
    ]
  },
  {
    "value": "Technology",
    "display": "Technology"
  },
  {
    "value": "True Crime",
    "display": "True Crime"
  },
  {
    "value": "TV & Film",
    "display": "TV & Film",
    "subCategories": [
      {
        "value": "TV & Film|After Shows",
        "display": "After Shows"
      },
      {
        "value": "TV & Film|Film History",
        "display": "Film History"
      },
      {
        "value": "TV & Film|Film Interviews",
        "display": "Film Interviews"
      },
      {
        "value": "TV & Film|Film Reviews",
        "display": "Film Reviews"
      },
      {
        "value": "TV & Film|TV Reviews",
        "display": "TV Reviews"
      }
    ]
  }
]
export { categories, topics, podcastCategories }
