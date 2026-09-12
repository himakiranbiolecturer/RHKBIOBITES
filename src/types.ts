export interface NCERTKeyPoints {
  pageReference: string;
  points: string[];
  trapAlert?: string;
}

export interface PYQAlert {
  examYears: string[];
  questionSnippet: string;
  conceptTested: string;
  solutionInsight: string;
}

export interface DiagramData {
  title: string;
  type:
    | 'dna'
    | 'glycolysis'
    | 'nephron'
    | 'lacOperon'
    | 'dihybrid'
    | 'counterCurrent'
    | 'nucleosome'
    | 'custom'
    | 'breathing'
    | 'cardiac'
    | 'sarcomere'
    | 'neural'
    | 'hormone'
    | 'cellStructure'
    | 'biomolecules'
    | 'cellCycle';
  caption: string;
  labels: string[];
}

export interface MicroCard {
  id: string;
  chapterId: string;
  subLessonId: string;
  title: string;
  subtitle: string;
  highYieldTag: 'Must-Know' | 'Frequently Asked' | 'Assertion-Reason Hotspot' | 'Diagram-Based';
  estimatedReadTime: string;
  ncertUnit: string;
  ncertClass: 'Class XI' | 'Class XII';
  coreConcept: {
    summary: string;
    bulletPoints: string[];
  };
  diagram: DiagramData;
  ncertKeyPoints: NCERTKeyPoints;
  pyqAlert: PYQAlert;
  mnemonic?: string;
  flashTest: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface SubLesson {
  id: string;
  title: string;
  cardCount: number;
}

export interface Chapter {
  id: string;
  title: string;
  unit: string;
  classLevel: 'Class XI' | 'Class XII';
  weightage: string;
  iconClass: string;
  subLessons: SubLesson[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  ncertRef: string;
}
