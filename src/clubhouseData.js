const topics = {
  '๐ World Affairs': [
    '๐ฆ Climate',
    '๐ฐ Current Affairs',
    '๐งฎ Markets',
    '๐บ๐ธ U.S. Politics',
    '๐ฅ Social Issues',
    '๐ Geopolitics',
    '๐ญ Economics'
  ],
  '๐บ Places': [
    '๐ San Francisco',
    '๐ณ๐ฌ Nigeria',
    '๐ฝ New York',
    '๐ฎ๐ณ India',
    '๐ฌ๐ง London',
    '๐ Los Angeles',
    '๐ซ๐ท Paris',
    '๐ Atlanta',
    '๐ Africa'
  ],
  '๐ฅ Hustle': [
    '๐ Small Business',
    '๐ Stocks',
    '๐ Instagram',
    '๐ฑ Networking',
    '๐ฏ Pitch Practice',
    '๐น Entrepreneurship',
    '๐ Clubhouse',
    '๐ต Tik Tok',
    '๐ก Real Estate'
  ],
  '๐ Sports': [
    '๐ฒ Cycling',
    '๐ฅ MMA',
    'โฝ๏ธ Soccer',
    'โพ๏ธ Baseball',
    '๐ Formula 1',
    'โณ๏ธ Golf',
    '๐ Football',
    '๐ Basketball',
    '๐พ Tennis',
    '๐ Cricket'
  ],
  '๐กKnowledge': [
    '๐ง Psychology',
    '๐ฆ  Covid-19',
    '๐ฌ Science',
    '๐ฐ Space',
    '๐ Education',
    '๐ฑ Math',
    '๐ณ Philosophy',
    '๐งฒ Physics',
    'โณ The Future',
    '๐งฌ Biology',
    '๐ฟ History'
  ],
  '๐ฃ Identity': [
    '๐ Indigenous',
    '๐งจ Baby Boomers',
    'โฟ๏ธ Disabled',
    '๐ South Asian',
    'โค๏ธ BIPOC',
    '๐ด Gen Z',
    '๐ญWomen',
    '๐ East Asian',
    '๐ป Millennials',
    '๐ Gen X',
    '๐ Latino',
    '๐งก Black',
    '๐ณ๏ธ&zwj;๐ LGBTQ'
  ],
  '๐ญ Arts': [
    '๐๐ฝ Dance',
    '๐ฃ Food &amp; Drink',
    '๐ Books',
    '๐ญ Theater',
    '๐ธ Sci-Fi',
    '๐ Art',
    '๐ Architecture',
    '๐ Fashion',
    '๐ Advertising',
    '๐ Writing',
    '๐คฏ Burning Man',
    '๐ Beauty',
    '๐ Design',
    '๐ท Photography'
  ],
  '๐ธ Entertainment': [
    '๐ Celebreties',
    '๐ Comedy',
    'โ๏ธ Advice',
    '๐ง Music',
    '๐ฅ Fun',
    '๐ค Karaoke',
    '๐ธ Anime &amp; Manga',
    '๐ฏ Variety',
    '๐ซ Performances',
    '๐บ Television',
    '๐ Storytelling',
    '๐น Gaming',
    '๐ป Podcasts',
    '๐๐ฟ&zwj;โ๏ธ Trivia',
    '๐ Movies'
  ],
  '๐ Faith': [
    '๐ Islam',
    '๐ Judaism',
    '๐ฏ Spirituality',
    '๐ฃ Taoism',
    'โ Agnosticism',
    '๐ฉ Sikhism',
    '๐ฟ Buddhism',
    '๐ Hinduism',
    'โช๏ธ Christianity',
    '๐ช Atheism'
  ],
  '๐งญ Tech': [
    '๐ Engineering',
    '๐ฅฝ VR/AR',
    '๐ฐ Venture Capital',
    'โ๏ธ SaaS',
    '๐ Crypto',
    '๐ฆ Startups',
    '๐ฑ Product',
    '๐ต Angel Investing',
    '๐ง  AI',
    '๐ Marketing',
    '๐ DTC'
  ],
  '๐ฅณ Hanging Out': [
    'โจ Meet People',
    '๐ฆ ยฏ_(ใ)_/ยฏ',
    '๐ฉ&zwj;๐ป Coworking',
    '๐ Late Night',
    '๐ง Chill Vibes',
    '๐ Welcome Newbies',
    '๐ท Bring a Drink',
    '๐ PTR'
  ],
  '๐ฌ Languages': [
    '๐ช๐ธ Spanish',
    '๐ฉ๐ช German',
    '๐จ๐ณ Mandarin',
    '๐ท๐บ Russian',
    '๐ฏ๐ต Japanese',
    '๐ฎ๐ฉ Indonesian',
    '๐ต๐พ Arabic',
    '๐ง๐ท Portuguese',
    '๐ซ๐ท French',
    '๐ฎ๐ณ Hindi'
  ],
  '๐ฟ Wellness': [
    '๐ง๐ป&zwj;โ๏ธ Meditation',
    'โบ๏ธ Outdoors',
    '๐ Health',
    '๐ฝ Nutrition',
    '๐ Medicine',
    '๐ฅ Veganism',
    '๐๐ฟ&zwj;โ๏ธ Weights',
    '๐&zwj;โ๏ธ Fitness',
    '๐ Mindfulness',
    '๐ Psychedelics'
  ],
  '๐ป Life': [
    '๐งธ Parenting',
    '๐ Weddings',
    '๐ฃ Pregnancy',
    '๐งถ Relationships',
    'โ๏ธ Traveling',
    '๐ธ Grownuping',
    '๐ Dating',
    'โ๏ธ Support'
  ]
}

const categories = [
  '๐ World Affairs',
  '๐บ Places',
  '๐ฅ Hustle',
  '๐ Sports',
  '๐กKnowledge',
  '๐ฃ Identity',
  '๐ญ Arts',
  '๐ธ Entertainment',
  '๐ Faith',
  '๐งญ Tech',
  '๐ฅณ Hanging Out',
  '๐ฌ Languages',
  '๐ฟ Wellness',
  '๐ป Life'
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
