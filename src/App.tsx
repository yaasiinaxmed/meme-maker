import React, { useState, useCallback } from 'react';
import {
  Coins,
  Dog,
  Cat,
  RefreshCw,
  Copy,
  Download,
  Wand2,
} from 'lucide-react';
import axios from 'axios';

type AnimalType = 'dog' | 'cat';

const prefixes = [
  'Moon',
  'Hyper',
  'Lucky',
  'Magic',
  'Crypto',
  'Mega',
  'Turbo',
  'Rocket',
  'Super',
  'Ultra',
  'Fluffy',
  'Baby',
  'Chonk',
  'Sleepy',
  'Zoomer',
];

const breeds = {
  dog: [
    'Shiba',
    'Doge',
    'Floki',
    'Bonk',
    'Mog',
    'Dogwifhat',
    'Kabosu',
    'Corgi',
    'Husky',
    'Puppy',
    'Woof',
    'DegenDoge',
    'Inu',
    'Bork',
    'Cheems',
  ],
  cat: [
    'Pepe',
    'Kitty',
    'Popcat',
    'Brett',
    'G',
    'BookOfMEME',
    'Mew',
    'Munchkin',
    'Neko',
    'Tabby',
    'Purr',
    'Meow',
    'Chonk',
    'Garfi',
    'Nyancat',
  ],
};

function getRandomElement(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateName(type: AnimalType) {
  const prefix = getRandomElement(prefixes);
  const breed = getRandomElement(breeds[type]);
  return `${prefix}${breed}`;
}

function generateSymbol(name: string) {
  return `$${name
    .replace(/[aeiou]/gi, '')
    .substring(0, 4)
    .toUpperCase()}`;
}

function generateDescription(type: AnimalType) {
  const actions = [
    'to the moon! 🚀',
    'making crypto cute! 💖',
    'spreading joy! ✨',
    'bringing smiles! 😊',
  ];
  const action = getRandomElement(actions);
  return `The cutest ${type} token in crypto, ${action}`;
}

function App() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [description, setDescription] = useState('');
  const [animalType, setAnimalType] = useState<AnimalType>('dog');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateRandomContent = useCallback(() => {
    const newName = generateName(animalType);
    setName(newName);
    setSymbol(generateSymbol(newName));
    setDescription(generateDescription(animalType));
  }, [animalType]);

  const fetchRandomImage = async () => {
    setLoading(true);
    try {
      if (animalType === 'dog') {
        const response = await axios.get(
          'https://dog.ceo/api/breeds/image/random'
        );
        setImageUrl(response.data.message);
      } else {
        const response = await axios.get(
          'https://api.thecatapi.com/v1/images/search'
        );
        setImageUrl(response.data[0].url);
      }
      // generateRandomContent();
    } catch (error) {
      console.error('Error fetching image:', error);
    }
    setLoading(false);
  };

  const handleAnimalTypeChange = (type: AnimalType) => {
    setAnimalType(type);
    setImageUrl('');
    generateRandomContent();
  };

  const downloadImage = () => {
    if (!imageUrl) {
      alert('No image to download!');
      return;
    }

    // Open image in a new tab for manual saving (avoids CORS issues)
    window.open(imageUrl, '_blank');
  };

  React.useEffect(() => {
    generateRandomContent();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Coins className="w-12 h-12 text-green-400 mr-3" />
          <h1 className="text-4xl font-bold text-white">MemeMaker</h1>
        </div>

        <div className="bg-black/40 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-green-500/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-green-400 font-medium">
                    Character Name
                  </label>
                  <button
                    onClick={generateRandomContent}
                    className="text-green-400 hover:text-green-300 flex items-center"
                  >
                    <Wand2 className="w-4 h-4 mr-1" />
                    Generate
                  </button>
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-green-500/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                  placeholder="e.g., CuteCorgi"
                />
              </div>

              <div>
                <label className="block text-green-400 font-medium mb-2">
                  Token Symbol
                </label>
                <input
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-green-500/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                  placeholder="e.g., $CUTE"
                />
              </div>

              <div>
                <label className="block text-green-400 font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-green-500/30 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white h-20"
                  placeholder="Enter your meme coin description..."
                />
              </div>

              <div>
                <label className="block text-green-400 font-medium mb-2">
                  Character Type
                </label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleAnimalTypeChange('dog')}
                    className={`flex items-center px-4 py-2 rounded-lg ${
                      animalType === 'dog'
                        ? 'bg-green-600 text-white'
                        : 'bg-black/50 text-green-400 border border-green-500/30'
                    }`}
                  >
                    <Dog className="w-5 h-5 mr-2" />
                    Dog
                  </button>
                  <button
                    onClick={() => handleAnimalTypeChange('cat')}
                    className={`flex items-center px-4 py-2 rounded-lg ${
                      animalType === 'cat'
                        ? 'bg-green-600 text-white'
                        : 'bg-black/50 text-green-400 border border-green-500/30'
                    }`}
                  >
                    <Cat className="w-5 h-5 mr-2" />
                    Cat
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div
                className="aspect-square bg-black/50 rounded-lg overflow-hidden relative cursor-pointer group"
                onClick={fetchRandomImage}
              >
                {imageUrl ? (
                  <>
                    <img
                      src={imageUrl}
                      alt="Character mascot"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white text-lg">
                        Click to generate new character
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-green-400">
                    Click to generate a cute {animalType} character!
                  </div>
                )}
                {loading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <RefreshCw className="w-8 h-8 text-green-400 animate-spin" />
                  </div>
                )}
              </div>
              <button
                onClick={downloadImage}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                disabled={!imageUrl || loading}
              >
                <Download className={`w-5 h-5 mr-2`} />
                Download Image
              </button>
            </div>
          </div>

          {/* <div className="mt-8 p-6 bg-black/50 rounded-lg border border-green-500/20">
            <h2 className="text-xl font-semibold mb-4 text-green-400">
              Preview
            </h2>
            <div className="space-y-2 text-white">
              <p>
                <span className="font-medium text-green-400">Name:</span>{' '}
                {name || 'Not set'}
              </p>
              <p>
                <span className="font-medium text-green-400">Symbol:</span>{' '}
                {symbol || 'Not set'}
              </p>
              <p>
                <span className="font-medium text-green-400">Description:</span>{' '}
                {description || 'Not set'}
              </p>
            </div>
                </div>*/}
        </div>

        <div className="text-center mt-8 text-green-400/60 text-sm">© 2025</div>
      </div>
    </div>
  );
}

export default App;
