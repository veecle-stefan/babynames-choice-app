// This is just an example,
// so you can safely delete all default props below

export default {
  err: {
    localstorage: 'Couldn\'t save settings. Local storage inaccessible'
  },
  pages: {
    index: 'Overview',
    sound: 'Sound',
    about: 'About'
  },
  names: {
    keywords: 'Meaning',
    dictionarywords: 'Similar words',
    related: 'Related names'
  },
  wizard: {
    brother: 'Brother',
    sister: 'Sister',
    unisex: 'Unisex',
    back: 'Back',
    continue: {
      withsiblings: 'Next',
      nosiblings: 'Continue without sibling',
      multiplesiblings: 'Next',
      sound: 'Next'
    },
    privacy: 'Below, you can enter the last name of the child you expect. You can also enter the mother\'s and father\'s first name in order to find better baby names that match your familiy. These names stay in this app and are not sent to anybody. But if you feel you don\'t want to enter them, just leave the respective fields empty.',
    family: 'We now take the mother {mom} {family} and father {dad} {family} into consideration. You can further improve the name search by adding children that already exist or whose names you already know.',
    familyname: {
      title: 'Family name',
      label: 'Last name',
      err: '',
      placeholder: 'e.g. Smith',
      hint: 'Enter the last name that your newborn will have'
    },
    parents: {
      title: 'Parent names'
    },
    mother: {
      label: 'Mother',
      err: '',
      placeholder: 'e.g. Martha',
      hint: 'The mother\'s first name'
    },
    father: {
      label: 'Father',
      err: '',
      placeholder: 'e.g. John',
      hint: 'The father\'s first name'
    },
    sibling: {
      title: 'Siblings',
      addfirst: 'Add first sibling',
      label: 'Sibling',
      err: 'You entered this name more than once',
      placeholder: 'e.g. Jane',
      hint: 'Enter sibling\'s name. Either existing children or names of siblings you already know.'
    },
    sound: {
      title: 'Choose sound',
      use: 'Prefer sound',
      hint: 'Here, you can choose how you want the name to sound. Every name is made up of syllables. And syllables contain vowels that can have either a front or back sound, or a diphthong as in \'Trio\'',
      front: 'Front',
      back: 'Back',
      diphthong: 'Diphthong',
      example: 'Example'
    },
    narrow: {
      title: 'Narrow down'
    },
    precautions: {
      title: 'Precautions',
      hint: 'Some names can be pitfalls. If you want to be cautious, here are some options to consider.',
      grandma: {
        title: 'Grandma-safe',
        hint: 'Some names are a bit too modern for the taste of your parents, so your child\'s grandparents. Maybe you fear they mispronounce it or they never get the spelling right. This option excludes names with difficult pronunciation or unclear spelling.'
      },
      grownup: {
        title: 'Grown-up-safe',
        hint: 'Some names sound very cute for little girls and boys. But what if they grew up? This option excludes names that are not adult-sounding enough for grown-ups.'
      }
    }
  },
  menu: {
    overview: 'Overview',
    sound: 'Choose by Sound',
    family: 'Build a family',
    database: 'Show all...',
    settings: 'Settings',
    about: 'About'
  },
  methods: {
    sound: {
      title: '...by sound',
      sub: 'the phonetics',
      hint: 'Find out which phonetics you like and how many syllables. This makes up the sound of a name. It can be inviting, charming, positive, succint, melodic, ...'
    },
    family: {
      title: '...by family',
      sub: 'the siblings and ancestors',
      hint: 'A name you choose should match your family name or last name and should fit well to the siblings and the parent\'s first names. Here, you can also find fitting middle and second names.'
    }
  },
  overview: {
    cta: 'Choose a name based on ...',
    btnSound: 'Sound',
    btnFamily: 'Family',
    btnSyllables: 'Syllables'
  },
  about: {
    title: 'Easy Baby Name Chooser',
    description: 'Choosing a name for your newborn is very responsible task. After all, your child has to live with it for its entire life! Also, while some baby names sound cute, they are not suitable for an adult. This app helps you pick the right name. A name that you love for the rest of your life.',
    attributions: 'Attributions',
    imprint: 'Imprint',
    legal: 'Copyright (C) 2021 <br />Stefan Nürnberger<br />Grosshzg-Frdr-Str.99<br />66121 Saarbruecken <br />GERMANY',
    software: 'Built with',
    swhint: 'Quasar App development framework for desktop, Android and iOs.'
  }

}
