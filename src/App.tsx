import React, { useState } from 'react';
import { Sparkles, Users, ArrowRight, RefreshCw, Star } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    scores: Record<string, number>;
  }[];
}

interface Tier {
  id: string;
  name: string;
  tagline: string;
  imageUrl: string;
  description: string;
  idealFor: string[];
  benefits: string[];
  color: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Let's start with something fun! How would your friends describe your AI journey?",
    options: [
      {
        text: "I'm the one always saying 'Did you hear about this cool AI thing?' 🌟",
        scores: { changemaker: 3, disruptor: 1, titan: 0 }
      },
      {
        text: "They come to me for AI advice - I'm their go-to tech guru! 💫",
        scores: { changemaker: 1, disruptor: 3, titan: 1 }
      },
      {
        text: "I'm the visionary they look up to - leading the AI revolution! 👑",
        scores: { changemaker: 0, disruptor: 1, titan: 3 }
      }
    ]
  },
  {
    id: 2,
    text: "Picture yourself at a Women X AI event - what's your dream role?",
    options: [
      {
        text: "Soaking up knowledge like a sponge and making amazing connections! 🎓",
        scores: { changemaker: 3, disruptor: 1, titan: 0 }
      },
      {
        text: "Leading an inspiring workshop and empowering others! ✨",
        scores: { changemaker: 1, disruptor: 3, titan: 1 }
      },
      {
        text: "Delivering a keynote that changes how people think about AI! 🎯",
        scores: { changemaker: 0, disruptor: 1, titan: 3 }
      }
    ]
  },
  {
    id: 3,
    text: "What's your superpower in the AI community?",
    options: [
      {
        text: "Bringing fresh perspectives and endless curiosity! 🌈",
        scores: { changemaker: 3, disruptor: 1, titan: 0 }
      },
      {
        text: "Bridging gaps and helping others level up their AI game! 🚀",
        scores: { changemaker: 1, disruptor: 3, titan: 1 }
      },
      {
        text: "Shaping the future of AI with groundbreaking ideas! ⭐",
        scores: { changemaker: 0, disruptor: 1, titan: 3 }
      }
    ]
  }
];

const tiers: Tier[] = [
  {
    id: 'changemaker',
    name: 'Changemaker',
    tagline: 'Shaping the Future of AI',
    imageUrl: '/changmakers_magnifics_mystic-jF7j1g6E0CHr3iyAhzVY.jpeg',
    description: 'You\'re the spark that ignites change! As a Changemaker, you bring fresh energy and innovative thinking to our AI community.',
    idealFor: [
      'Curious minds ready to explore AI\'s possibilities',
      'Rising stars with fresh perspectives (<6 years experience)',
      'Creative thinkers from all backgrounds'
    ],
    benefits: [
      'Unlock exclusive AI content crafted just for you',
      'Join an amazing community of fellow AI enthusiasts',
      'Connect with inspiring mentors who\'ve been in your shoes',
      'Share your unique voice through our guest blog series',
      'Be part of the fun at #WXAISocialSaturdays'
    ],
    color: 'bg-purple-600'
  },
  {
    id: 'disruptor',
    name: 'Disruptor',
    tagline: 'Redefining AI\'s Future',
    imageUrl: '/disruptors_mystic-9szMud2qMF9Pu834TpAz.jpeg',
    description: 'You\'re a force of nature in the AI world! As a Disruptor, you\'re breaking barriers and leading the charge for innovation.',
    idealFor: [
      'Innovative AI champions making waves',
      'Experienced pros with amazing insights to share',
      'Leaders with 6+ years of transformative experience'
    ],
    benefits: [
      'Lead game-changing workshops that inspire others',
      'Shape the next generation of AI leaders through mentoring',
      'Drive innovation through community initiatives',
      'Shine in our AI Spotlight series'
    ],
    color: 'bg-blue-600'
  },
  {
    id: 'titan',
    name: 'Titan',
    tagline: 'Defining AI\'s Future',
    imageUrl: '/tiitans_magnifics_mystic-guFw2RHfiSjxqqmD7KrV 2.jpeg',
    description: 'You\'re an AI visionary! As a Titan, you\'re not just part of the conversation - you\'re leading it.',
    idealFor: [
      'Visionary leaders shaping AI\'s future',
      'Industry pioneers with groundbreaking ideas',
      'Seasoned experts with 10+ years of impact'
    ],
    benefits: [
      'Shape the future through powerful keynotes & thought leadership',
      'Connect with fellow visionaries in exclusive events',
      'Be featured as a leading voice in Women X AI',
      'Guide the next generation of AI pioneers',
      'Access exclusive partnership opportunities'
    ],
    color: 'bg-indigo-600'
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    changemaker: 0,
    disruptor: 0,
    titan: 0
  });
  const [showResult, setShowResult] = useState(false);
  const [animation, setAnimation] = useState('');

  const handleAnswer = (optionScores: Record<string, number>) => {
    setAnimation('fade-out');
    setTimeout(() => {
      setScores(prevScores => {
        const newScores = { ...prevScores };
        Object.keys(optionScores).forEach(tier => {
          newScores[tier] = (newScores[tier] || 0) + optionScores[tier];
        });
        return newScores;
      });

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setShowResult(true);
      }
      setAnimation('fade-in');
    }, 300);
  };

  const getRecommendedTier = () => {
    const maxScore = Math.max(...Object.values(scores));
    return tiers.find(tier => scores[tier.id] === maxScore) || tiers[0];
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({ changemaker: 0, disruptor: 0, titan: 0 });
    setShowResult(false);
    setAnimation('fade-in');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 rounded-2xl">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 mb-6">
            <Sparkles className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover the Right WxAI Membership Tier ✨
          </h1>
          <p className="text-lg text-gray-600">
            Take this fun quiz to find your perfect place in the Women X AI community
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          {!showResult ? (
            <div className={`transition-opacity duration-300 ${animation}`}>
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-500">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <div className="h-2 bg-gray-200 rounded-full w-64">
                    <div
                      className="h-2 bg-purple-600 rounded-full transition-all duration-300"
                      style={{
                        width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {questions[currentQuestion].text}
                </h2>
              </div>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.scores)}
                    className="w-full text-left p-6 rounded-lg border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 flex items-center justify-between group"
                  >
                    <span className="text-lg text-gray-700 group-hover:text-purple-700">
                      {option.text}
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className={`transition-opacity duration-300 ${animation}`}>
              <div className="text-center mb-8">
                <div className="mb-6">
                  <img
                    src={getRecommendedTier().imageUrl}
                    alt={getRecommendedTier().name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                  />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Congratulations! You're a {getRecommendedTier().name}! 🎉
                </h2>
                <h3 className="text-xl text-purple-600 mb-4">
                  {getRecommendedTier().tagline}
                </h3>
                <p className="text-gray-600 text-lg">
                  {getRecommendedTier().description}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Perfect For:</h3>
                <ul className="space-y-3">
                  {getRecommendedTier().idealFor.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <Users className="w-5 h-5 text-purple-500 mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Amazing Benefits:</h3>
                <ul className="space-y-3">
                  {getRecommendedTier().benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <Star className="w-5 h-5 text-purple-500 mr-3" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <button
                  onClick={resetQuiz}
                  className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Take the Quiz Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;