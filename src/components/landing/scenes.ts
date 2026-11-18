/**
 * Pictures on the landing page (redesign PR 3). The seven course scenes were made
 * for the site with Codex and inspected for pedagogy and cultural accuracy (ADR-0024);
 * the EFMP-302 and EFMP-304 ones are smaller copies of published course figures, with
 * the same alt text as their topic pages. Images live in static/img/site/.
 */
export type Scene = { src: string; w: number; h: number; en: string; ur: string };

export const SCENES = {
  "E301": {
    "src": "/img/site/efmp-301.webp",
    "w": 960,
    "h": 536,
    "en": "A teacher in a dupatta sits at a low table, smiling as a girl and a boy in uniform solve a wooden shape puzzle.",
    "ur": "دوپٹہ اوڑھے ایک استانی نیچی میز کے پاس بیٹھی مسکرا رہی ہیں اور یونیفارم پہنے ایک لڑکی اور ایک لڑکا لکڑی کی شکلوں والی پہیلی حل کر رہے ہیں۔"
  },
  "E305": {
    "src": "/img/site/efmp-305.webp",
    "w": 800,
    "h": 450,
    "en": "In a classroom with a ramp at the door, a boy using a wheelchair, a girl with a hearing aid and two classmates work on a picture chart with their teacher.",
    "ur": "ایک جماعت میں، جس کے دروازے پر ریمپ ہے، وہیل چیئر استعمال کرنے والا لڑکا، سماعت کا آلہ لگائے لڑکی اور دو ہم جماعت اپنی استانی کے ساتھ تصویری چارٹ پر کام کر رہے ہیں۔"
  },
  "GNAS": {
    "src": "/img/site/gnas-301.webp",
    "w": 720,
    "h": 405,
    "en": "Student teachers on a nature walk beside a canal in rural Sindh plant a young sapling and write notes in their notebooks.",
    "ur": "دیہی سندھ میں نہر کے کنارے سیر کے دوران زیرِ تربیت اساتذہ ایک ننھا پودا لگا رہے ہیں اور اپنی کاپیوں میں نوٹس لکھ رہے ہیں۔"
  },
  "GICT": {
    "src": "/img/site/gict-300.webp",
    "w": 960,
    "h": 540,
    "en": "Student teachers share computers and a laptop in a small college lab while an instructor points at a screen.",
    "ur": "کالج کی ایک چھوٹی لیب میں زیرِ تربیت اساتذہ کمپیوٹر اور لیپ ٹاپ پر مل کر کام کر رہے ہیں اور ایک معلمہ اسکرین کی طرف اشارہ کر رہی ہیں۔"
  },
  "GQUR": {
    "src": "/img/site/gqur-301.webp",
    "w": 960,
    "h": 540,
    "en": "Two student teachers collect data at a table: one sorts coloured counters into piles while the other draws a bar chart.",
    "ur": "دو زیرِ تربیت استانیاں میز پر ڈیٹا جمع کر رہی ہیں: ایک رنگین گوٹیوں کو ڈھیریوں میں بانٹ رہی ہے اور دوسری بار چارٹ بنا رہی ہے۔"
  },
  "GSOS": {
    "src": "/img/site/gsos-301.webp",
    "w": 720,
    "h": 405,
    "en": "Parents, elders and teachers talk together on charpoys under a large tree beside a village school while children play nearby.",
    "ur": "گاؤں کے اسکول کے پاس ایک بڑے درخت کے نیچے والدین، بزرگ اور اساتذہ چارپائیوں پر بیٹھے بات کر رہے ہیں اور قریب ہی بچے کھیل رہے ہیں۔"
  },
  "GENG": {
    "src": "/img/site/geng-300.webp",
    "w": 960,
    "h": 540,
    "en": "Two student teachers practise a conversation across a library table, with open books and notebooks between them.",
    "ur": "دو زیرِ تربیت استانیاں لائبریری کی میز پر آمنے سامنے بیٹھی گفتگو کی مشق کر رہی ہیں، اور ان کے درمیان کھلی کتابیں اور کاپیاں ہیں۔"
  },
  "U1-9": {
    "src": "/img/site/efmp-302-fig-U1-9.webp",
    "w": 720,
    "h": 402,
    "en": "A young trainee teacher stands at the front of a bright primary classroom in Sindh, facing attentive pupils in uniform, while an experienced colleague watches encouragingly from the doorway.",
    "ur": "ایک نوجوان زیرِ تربیت استانی سندھ کے ایک روشن پرائمری کمرۂ جماعت میں یونیفارم پہنے توجہ سے سنتے بچوں کے سامنے کھڑی ہیں، جبکہ ایک تجربہ کار ساتھی دروازے سے حوصلہ افزا نظروں سے دیکھ رہی ہیں۔"
  },
  "U3-11": {
    "src": "/img/site/efmp-302-fig-U3-11.webp",
    "w": 720,
    "h": 402,
    "en": "A teacher crouches beside a desk to listen as a boy and a girl explain their work, while the rest of the class works in pairs in a lively Sindh classroom.",
    "ur": "ایک استانی سندھ کی ایک پُررونق جماعت میں ایک میز کے پاس گھٹنوں کے بل بیٹھی ایک لڑکے اور ایک لڑکی کی وضاحت غور سے سن رہی ہیں، جبکہ باقی جماعت جوڑیوں میں کام کر رہی ہے۔"
  },
  "U3-13": {
    "src": "/img/site/efmp-302-fig-U3-13.webp",
    "w": 720,
    "h": 402,
    "en": "Two trainee teachers prepare the evening before practicum: one anxiously holds up a pair of shoes while the other sits surrounded by open textbooks and notes.",
    "ur": "دو زیرِ تربیت استانیاں پریکٹیکم سے پہلی شام تیاری کر رہی ہیں: ایک فکرمندی سے جوتوں کا جوڑا اٹھائے ہوئے ہے جبکہ دوسری کھلی کتابوں اور نوٹس میں گھری بیٹھی ہے۔"
  },
  "U3-16": {
    "src": "/img/site/efmp-302-fig-U3-16.webp",
    "w": 720,
    "h": 402,
    "en": "In a science lesson, pupils in pairs test push-and-pull experiments with toy carts while their teacher walks between them, observing and taking notes.",
    "ur": "سائنس کے سبق میں بچے جوڑیوں میں کھلونا گاڑیوں کے ساتھ دھکیلنے اور کھینچنے کے تجربات کر رہے ہیں جبکہ استاد اُن کے بیچ چلتے ہوئے مشاہدہ کر کے نوٹس لکھ رہے ہیں۔"
  },
  "U6-9": {
    "src": "/img/site/efmp-302-fig-U6-9.webp",
    "w": 720,
    "h": 402,
    "en": "A circle of teachers of different ages sit under a tree in a school courtyard, sharing notebooks and discussing their teaching.",
    "ur": "مختلف عمروں کے اساتذہ اسکول کے صحن میں ایک درخت کے نیچے دائرے میں بیٹھے اپنی کاپیاں ایک دوسرے کو دکھا کر اپنی تدریس پر بات کر رہے ہیں۔"
  },
  "U6-10": {
    "src": "/img/site/efmp-302-fig-U6-10.webp",
    "w": 720,
    "h": 402,
    "en": "A teacher sits at home flipping through a thick folder of workshop certificates with a puzzled, reflective look, his lesson notebook unopened beside him.",
    "ur": "ایک استاد گھر پر بیٹھے ورکشاپ کی اسناد کی موٹی فائل حیرت اور غور کے ساتھ پلٹ رہے ہیں، اور اُن کی سبق کی کاپی بند پڑی ہے۔"
  },
  "E304": {
    "src": "/img/site/efmp-304-fig-U3-9.webp",
    "w": 720,
    "h": 402,
    "en": "Two teachers in a staffroom stand before a whiteboard showing the classical form of an argument, one explaining and the other taking notes.",
    "ur": "اسٹاف روم میں دو اساتذہ ایک وائٹ بورڈ کے سامنے کھڑے ہیں جس پر دلیل کی کلاسیکی شکل بنی ہے؛ ایک سمجھا رہے ہیں اور دوسری نوٹس لکھ رہی ہیں۔"
  }
} as const satisfies Record<string, Scene>;

export type SceneId = keyof typeof SCENES;
