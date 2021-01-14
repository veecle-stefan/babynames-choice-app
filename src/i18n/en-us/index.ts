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
    back: 'Back',
    continue: {
      withsiblings: 'Next',
      nosiblings: 'Continue without sibling',
      multiplesiblings: 'Next'
    },
    privacy: 'Below, you can enter the mother\'s and father\'s first name in order to find better baby names that match your familiy. The same applies for your last name, the family name. These names stay in this app and are not sent to anybody. But if you feel you don\'t want to enter them, just leave the respective fields empty.',
    family: 'Welcome {mom} {family} and {dad} {family}! Here, you can extend your family by adding children that already exist or whose names you already know.',
    familyname: {
      name: 'Family name',
      title: 'Family name',
      desc: 'Enter your familiy name to limit matches to names that fit your name.'
    },
    mother: {
      name: 'Mother',
      title: 'Mother',
      desc: 'Enter the mother\'s first name in order to consider baby names that fit well to the family.'
    },
    father: {
      name: 'Father',
      title: 'Father',
      desc: 'Enter the father\'s first name in order to consider baby names that fit well to the family.'
    },
    sibling: {
      add: 'Add sibling',
      name: 'Sibling',
      title: 'Other children (siblings)',
      desc: 'Enter siblings of the name you want to find. Either existing children or names of siblings you alread to assign.'
    },
    brother: 'Brother',
    sister: 'Sister',
    unisex: 'Unisex'
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
      desc: 'Find out which phonetics you like and how many syllables. This makes up the sound of a name. It can be inviting, charming, positive, succint, melodic, ...'
    },
    family: {
      title: '...by family',
      sub: 'the siblings and ancestors',
      desc: 'A name you choose should match your family name or last name and should fit well to the siblings and the parent\'s first names. Here, you can also find fitting middle and second names.'
    }
  },
  overview: {
    cta: 'Choose a name based on ...',
    btnSound: 'Sound',
    btnFamily: 'Family',
    btnSyllables: 'Syllables'
  },
  about: {
    title: 'EBANACO - Easy Baby Name Chooser',
    description: 'Choosing a name for your newborn is very responsible task. After all, your child has to live with it for its entire life! Also, while some baby names sound cute, they are not suitable for an adult. This app helps you pick the right name. A name that you love for the rest of your life.',
    imprint: 'Imprint',
    legal: 'Copyright (C) 2021 <br />Stefan Nürnberger<br />Grosshzg-Frdr-Str.99<br />66121 Saarbruecken <br />GERMANY',
    software: 'Built with',
    swdesc: 'Quasar App development framework for desktop, Android and iOs.'
  }

}
