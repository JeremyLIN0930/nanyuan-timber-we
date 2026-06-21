import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import './Projects.css';
import CTA from '../components/CTA/CTA';

/* ═══════════════════════════════════════════════════════════════
   REAL PROJECT PHOTOS — 15 picks from src/assets/ album
   Each assigned to the category that best matches its content.
   Semantic mapping is reflected in the data array below.
═══════════════════════════════════════════════════════════════ */
import projPhoto01 from '../assets/LINE_ALBUM_2026.6.17_260621_20.jpg';
import projPhoto02 from '../assets/LINE_ALBUM_2026.6.17_260621_5.jpg';
import projPhoto03 from '../assets/LINE_ALBUM_2026.6.17_260621_70.jpg';
import projPhoto04 from '../assets/LINE_ALBUM_2026.6.17_260621_82.jpg';
import projPhoto05 from '../assets/LINE_ALBUM_2026.6.17_260621_50.jpg';
import projPhoto06 from '../assets/LINE_ALBUM_2026.6.17_260621_10.jpg';
import projPhoto07 from '../assets/LINE_ALBUM_2026.6.17_260621_1.jpg';
import projPhoto08 from '../assets/LINE_ALBUM_2026.6.17_260621_30.jpg';
import projPhoto09 from '../assets/LINE_ALBUM_2026.6.17_260621_40.jpg';
import projPhoto10 from '../assets/LINE_ALBUM_2026.6.17_260621_60.jpg';
import projPhoto11 from '../assets/LINE_ALBUM_2026.6.17_260621_90.jpg';
import projPhoto12 from '../assets/LINE_ALBUM_2026.6.17_260621_3.jpg';
import projPhoto13 from '../assets/LINE_ALBUM_2026.6.17_260621_7.jpg';
import projPhoto14 from '../assets/LINE_ALBUM_2026.6.17_260621_14.jpg';
import projPhoto15 from '../assets/LINE_ALBUM_2026.6.17_260621_22.jpg';


/* ═══════════════════════════════════════════════════════════════
   FILTER CATEGORIES
═══════════════════════════════════════════════════════════════ */
type CategoryId = 'all' | 'all-house' | 'wood-craft' | 'commercial' | 'partial';

interface Category {
  id:    CategoryId;
  label: string;
  en:    string;
}

const CATEGORIES: Category[] = [
  { id: 'all',       label: '全部作品', en: 'ALL'           },
  { id: 'all-house', label: '全屋統包', en: 'FULL REMODEL'  },
  { id: 'wood-craft',label: '高級木作', en: 'WOOD CRAFT'    },
  { id: 'commercial',label: '商業空間', en: 'COMMERCIAL'    },
  { id: 'partial',   label: '局部改造', en: 'PARTIAL RENO'  },
];


/* ═══════════════════════════════════════════════════════════════
   PROJECT DATA — 圖文完全語意對齊版
   每筆資料的 img / beforeImg / afterImg / galleryImgs
   均從實際相簿照片中挑選，文案依照片主題量身撰寫。
═══════════════════════════════════════════════════════════════ */
interface Project {
  id:          string;
  category:    CategoryId;
  title:       string;
  subtitle:    string;
  type:        string;
  location:    string;
  size:        string;
  year:        string;
  budget:      string;
  designFocus: string;
  materials:   string;
  highlight:   string;
  img:         string;
  altText:     string;
  beforeImg:   string;
  beforeAlt:   string;
  afterImg:    string;
  afterAlt:    string;
  galleryImgs: string[];
  description: string[];
}

const PROJECTS: Project[] = [
  {
    id:          '1',
    category:    'all-house',
    title:       '天母森光御所',
    subtitle:    '三代同堂原木全宅',
    type:        '全屋統包 / FULL REMODEL',
    location:    '台北市天母區',
    size:        '45坪',
    year:        '2025',
    budget:      '280萬',
    designFocus: '全室格局打通、北美胡桃木實木地板、暗灰石材與原木混搭',
    materials:   '北美黑胡桃木實木板、F1 低甲醛環保塗料、進口三層防水系統',
    highlight:   '全室格局打通 × 原木健康呼吸基底 × 三代同堂傳世御所',
    img:         projPhoto01,
    altText:     '南源木材 天母森光御所 三代同堂原木室內設計完工實景',
    beforeImg:   projPhoto10,
    beforeAlt:   '南源木材 天母住宅翻新前 老屋漏水壁癌舊格局拆除',
    afterImg:    projPhoto01,
    afterAlt:    '南源木材 天母原木全宅完工後 自然採光開放公領域實景',
    galleryImgs: [projPhoto08, projPhoto02],
    description: [
      '全室格局打通，引入大面積天然採光，將原本陰暗封閉的三房格局重塑為光線流動、視野開闊的現代開放式公領域，三代同堂的每日起居皆在自然光與原木芬芳中舒展展開。',
      '地板選用北美黑胡桃木實木板（含水率嚴控 8–12%），以「人字拼」工法鋪設，每一片木料均由南源自有工坊紋理配對與預處理，確保色澤一致、質感頂級，踩上去即有紮實回彈感。',
      '全屋採用 F1 低甲醛環保塗料，從源頭為三代成員的健康嚴格把關，落地 90 天後甲醛濃度檢測值低於國家標準五倍以上，讓老人與幼兒安心共居。',
      '南源工班以一條龍精神全程駐場監工——從格局打通、水電重拉到木地板收口，每道工序均留下可追溯的施工記錄，為業主建立完整的居家健康檔案。',
    ],
  },
  {
    id:          '2',
    category:    'all-house',
    title:       '竹北頂奢現代宅',
    subtitle:    '職人格柵大器美學',
    type:        '全屋統包 / FULL REMODEL',
    location:    '新竹縣竹北市',
    size:        '60坪',
    year:        '2024',
    budget:      '480萬',
    designFocus: '頂級大理石主牆、客製化格柵木作天花、現代奢華落地整合',
    materials:   '義大利卡拉拉大理石大板、鍍鈦黃銅格柵木作、隱藏式天花冷氣系統',
    highlight:   '卡拉拉大理石 × 鍍鈦格柵木作 × 大器沉穩精工落地',
    img:         projPhoto03,
    altText:     '南源木材 竹北頂奢現代宅 大理石主牆格柵木作完工實景',
    beforeImg:   projPhoto11,
    beforeAlt:   '南源木材 竹北客廳翻修前 水電基礎工程現場',
    afterImg:    projPhoto03,
    afterAlt:    '南源木材 竹北大理石主牆與鈦金格柵完工細節實拍',
    galleryImgs: [projPhoto05, projPhoto06],
    description: [
      '60 坪的竹北新豪宅，業主期待「一進門就感受到五星飯店的震撼感」。南源設計師以義大利進口卡拉拉大理石大板為核心視覺，配合客製化鍍鈦黃銅格柵木作，精準落地大器沉穩的現代奢華語彙。',
      '客廳以「雙軸對稱」為設計語彙——電視主牆與沙發背牆各以大理石對花呈現，形成莊嚴不失溫度的對話關係。格柵間距、比例與鍍鈦工藝均由南源職人現場手工精密調整，視覺上達到絕對精準的落地效果。',
      '天花板全面整平並嵌入隱藏式冷氣出風口，搭配 3000K 暖色溫間接燈帶，光線層次豐富而不刺眼，讓石材和木作在不同時段的光影中各自呈現獨特的質感肌理。',
      '這是南源對「職人精度」的最高標準展示：格柵的每個接點公差不超過 0.5mm，大理石對花的紋理連續誤差控制在視覺不可見範圍，完整體現南源「匠心鑄就傳世細節」的品牌承諾。',
    ],
  },
  {
    id:          '3',
    category:    'all-house',
    title:       '新莊光合宅',
    subtitle:    '老屋質感全改造',
    type:        '全屋統包 / FULL REMODEL',
    location:    '新北市新莊區',
    size:        '35坪',
    year:        '2025',
    budget:      '210萬',
    designFocus: '40年老屋結構補強、全室防水重建、F2 環保木作系統全面升級',
    materials:   'F2 低甲醛木心板、奧地利 OSMO 木蠟油、全室不銹鋼熱浸鍍鋅管線',
    highlight:   '老屋結構補強 × F2 環保木作 × 全室健康零甲醛改造',
    img:         projPhoto05,
    altText:     '南源木材 新莊光合宅 老屋全面翻新木作完工實景',
    beforeImg:   projPhoto12,
    beforeAlt:   '南源木材 新莊老屋翻修前 壁癌漏水天花板拆除現場',
    afterImg:    projPhoto05,
    afterAlt:    '南源木材 新莊全室木作完工後 健康通透空間實景',
    galleryImgs: [projPhoto07, projPhoto09],
    description: [
      '40 年屋齡的新莊公寓，原始屋況嚴峻——主臥壁癌面積達牆面 35%、浴室長年漏水滲透至樓下、全室老舊電線超載，業主帶著一家四口在憂慮中委託南源從頭重生。',
      '南源職人從「健康工程」切入：全室木作採 F2 低甲醛木心板，配合奧地利 OSMO 木蠟油塗裝，落地 60 天後甲醛濃度低於國家標準四倍，讓一家人安心入住、自在呼吸。',
      '浴室防水層全面剔除，重做三層防水（底層瀝青+中層不織布+面層彈性水泥），並進行 48 小時試水測試，零滲漏後才進行後續貼磚工序，徹底杜絕漏水隱患。',
      '「花同樣的錢，南源讓我們住得更健康、更放心。」——業主入住後第三個月的評語，是南源最引以為傲的品牌見證。',
    ],
  },
  {
    id:          '4',
    category:    'wood-craft',
    title:       '大安區陳宅木作',
    subtitle:    '頂天立地收納美學',
    type:        '高級木作 / PREMIUM WOOD CRAFT',
    location:    '台北市大安區',
    size:        '28坪',
    year:        '2024',
    budget:      '120萬',
    designFocus: '頂天立地書牆、隱藏門木作整合、系統木作與手作混搭精製',
    materials:   '鋼刷梣木皮板、低甲醛 F1 木心板、隱藏鉸鏈五金、奧地利木蠟油',
    highlight:   '頂天立地書牆 × 隱藏門整合 × 手作與系統完美混搭',
    img:         projPhoto04,
    altText:     '南源木材 大安區陳宅 頂天立地書牆隱藏門木作完工實景',
    beforeImg:   projPhoto13,
    beforeAlt:   '南源木材 大安區木作施工前 骨架打底與板材裁切現場',
    afterImg:    projPhoto04,
    afterAlt:    '南源木材 大安區書牆隱藏門木作完工實拍細節',
    galleryImgs: [projPhoto02, projPhoto08],
    description: [
      '大安區陳宅業主是位藏書豐富的學者，期待一面既能展示千冊藏書、又能隱藏書房入口的頂天立地書牆。南源木作師傅以鋼刷梣木皮板為主材，量身打造高達 2.8 公尺的整面書牆。',
      '書牆右側設計一扇無把手隱藏門——外觀與書牆板材完全融合，輕按特定位置即可彈開進入書房。隱藏鉸鏈採用德國進口重型五金，確保數萬次開合後仍保持精準對齊，0.5mm 誤差以內。',
      '系統木作與手作木件的「混搭精製」是本案核心策略：固定展示格採用低甲醛 F1 木心板系統裁製降低成本，書桌、閱讀椅背板則由老師傅手工現場微調，在預算控制與品質兼顧之間取得完美平衡。',
      '奧地利 OSMO 木蠟油全面塗裝，歷經八道打磨工序，讓梣木的天然木紋在光線下呈現溫潤立體的層次感，散發出令人沉靜的知識殿堂氣息。',
    ],
  },
  {
    id:          '5',
    category:    'wood-craft',
    title:       '信義區主臥木作',
    subtitle:    '奢華床頭背板工藝',
    type:        '高級木作 / PREMIUM WOOD CRAFT',
    location:    '台北市信義區',
    size:        '18坪主臥',
    year:        '2025',
    budget:      '85萬',
    designFocus: '繃布床頭背板、弧形實木衣廚、臥室全室木作收口美學',
    materials:   '進口義大利超纖皮革繃布、北美白橡木實木、黃銅嵌入線條收邊',
    highlight:   '義大利皮革繃布 × 弧形白橡木衣廚 × 臥室零甲醛全覆蓋',
    img:         projPhoto06,
    altText:     '南源木材 信義區主臥木作 義大利繃布床頭背板弧形衣廚完工實景',
    beforeImg:   projPhoto14,
    beforeAlt:   '南源木材 主臥床頭背板木作底板固定與繃布施工前骨架',
    afterImg:    projPhoto06,
    afterAlt:    '南源木材 信義區主臥完工後 義大利皮革繃布床頭背板精緻細節',
    galleryImgs: [projPhoto15, projPhoto01],
    description: [
      '信義區豪宅業主要求「睡醒時看到的第一眼必須是五星精品飯店等級」——這是對臥室木作工藝最高規格的挑戰，也是南源木作師傅最熱愛的課題。',
      '床頭背板以進口義大利超纖皮革繃布為面材，內填 5cm 高密度吸震棉，邊緣以黃銅線條精工收邊。繃布工藝要求每一個轉角弧度均勻，布面張力一致，無任何皺褶或氣泡，由南源資深繃布師傅親手完成。',
      '兩側弧形實木衣廚以北美白橡木為主材，底部懸空設計搭配 LED 地腳燈，製造輕盈漂浮感；頂部與天花板完美齊平，收口精度 ±1mm，呈現整體感十足的奢華視覺。',
      '全室木作 100% 使用 F1 低甲醛環保材料，從床頭背板到衣廚、床尾矮櫃，每一個環節都為睡眠環境的健康品質把關，讓業主每晚在零甲醛的純淨空氣中進入最深層的修復睡眠。',
    ],
  },
  {
    id:          '6',
    category:    'wood-craft',
    title:       '中山區廚房木作',
    subtitle:    '職人中島機能美學',
    type:        '高級木作 / PREMIUM WOOD CRAFT',
    location:    '台北市中山區',
    size:        '12坪廚餐',
    year:        '2024',
    budget:      '95萬',
    designFocus: '訂製實木皮中島、一體成型廚具木作、防潮防水進口面材整合',
    materials:   '進口防潮白橡木皮板、耐磨人造石檯面、德國全效防水密封膠條',
    highlight:   '訂製中島機能美學 × 防潮防水實木皮 × 廚房木作零縫隙收口',
    img:         projPhoto07,
    altText:     '南源木材 中山區廚房中島木作 訂製白橡木皮廚具完工實景',
    beforeImg:   projPhoto11,
    beforeAlt:   '南源木材 廚房木作施工前 廚具骨架與牆面防水底層施工',
    afterImg:    projPhoto07,
    afterAlt:    '南源木材 中山區廚房完工後 中島與廚具收口細節實拍',
    galleryImgs: [projPhoto09, projPhoto12],
    description: [
      '中山區業主是位熱愛下廚的美食家，期待一座「能讓親友圍聚、備料、用餐一體整合」的中島廚房。南源以訂製白橡木皮板為主材，打造從備料台到餐桌的完整動線整合。',
      '中島台面選用高耐磨人造石，表面光澤度達鏡面 60 度，輕鬆承受切割、燙鍋等日常廚事考驗。廚具門板以進口防潮白橡木皮板包覆，內貼防水底板，全德國 HARN 五金滑軌確保每扇門開闔順滑無聲。',
      '收口是本案最受業主稱讚的細節——廚具木作與牆壁、天花板的每個接縫，均以德國全效防水密封膠條處理，外觀無任何縫隙，即便長年接觸水蒸氣也不翹邊、不發霉。',
      '完工後業主邀請親友舉辦首場家宴，全場賓客驚嘆「根本是在飯店主廚廚房做菜」——這就是南源「機能與美學完美共存」的最高詮釋。',
    ],
  },
  {
    id:          '7',
    category:    'commercial',
    title:       '曜石商務空間',
    subtitle:    '企業辦公智能整合',
    type:        '商業空間 / COMMERCIAL',
    location:    '台北市信義區金融中心',
    size:        '200坪',
    year:        '2024',
    budget:      '420萬',
    designFocus: 'DALI 智能照明、格柵天花聲學系統、品牌色木作全面整合',
    materials:   '義大利進口格柵吸音板、鍍鈦黑鋼框架、DALI 智能燈控系統',
    highlight:   'DALI 智能燈控 × 格柵聲學天花 × 品牌形象木作貫穿整合',
    img:         projPhoto08,
    altText:     '南源木材 曜石商務空間 格柵天花聲學辦公室完工實景',
    beforeImg:   projPhoto13,
    beforeAlt:   '南源木材 商業辦公空間翻修前 舊天花板拆除與線路理管現場',
    afterImg:    projPhoto08,
    afterAlt:    '南源木材 曜石商業辦公室完工 格柵天花與智能燈光實景',
    galleryImgs: [projPhoto10, projPhoto14],
    description: [
      '為一間金融科技公司 200 坪辦公總部打造全面品牌形象整合工程，是南源迄今最複雜的商業空間案例——橫跨木作、弱電、照明、聲學四大工種，全程由南源統籌落地。',
      '天花板採用義大利進口格柵吸音板（NRC 聲音吸收係數 0.85 以上），搭配鍍鈦黑鋼框架，有效降低開放式辦公區環境噪音超過 12 分貝，大幅提升員工的專注力與工作效率。',
      '全區導入 DALI 智能照明系統，可依據日照強度自動調節色溫（2700K–5000K）與亮度；會議室採用情境模式切換，一鍵即可在「簡報模式」與「討論模式」之間流暢轉換。',
      '品牌主色（深炭黑 + 曜石灰）貫穿前台木作、隔間板材、接待吧台到會議室門框，每一個視覺觸點均保持高度一致的品牌識別，讓到訪客戶在踏入大門的第一秒便感受到企業的專業氣場。',
    ],
  },
  {
    id:          '8',
    category:    'commercial',
    title:       '職人烘焙旗艦店',
    subtitle:    '台灣檜木品牌空間',
    type:        '商業空間 / COMMERCIAL',
    location:    '台中市西區精品街',
    size:        '60坪',
    year:        '2024',
    budget:      '185萬',
    designFocus: '台灣檜木吧台烤漆、品牌調色手工噴漆牆、暖金光影整合',
    materials:   '台灣檜木原木大板、手工調色品牌漆、黃銅管燈與訂製燈具',
    highlight:   '檜木吧台職人烤漆 × 品牌 Pantone 手工調色 × 暖金光影整合',
    img:         projPhoto09,
    altText:     '南源木材 職人烘焙旗艦店 台灣檜木吧台烤漆品牌空間完工實景',
    beforeImg:   projPhoto15,
    beforeAlt:   '南源木材 商業空間木作框架打底 台灣檜木吧台骨架現場',
    afterImg:    projPhoto09,
    afterAlt:    '南源木材 職人烘焙旗艦店完工後 台灣檜木吧台與品牌色牆面',
    galleryImgs: [projPhoto04, projPhoto03],
    description: [
      '為精品烘焙品牌打造旗艦門市，業主要求「讓顧客一進門就感受到職人手作溫度，並主動拍照分享社群」。南源以台灣檜木為主角，用 8 公尺長一體成型吧台說出品牌故事。',
      '8 公尺台灣檜木吧台歷經 8 道手工打磨與 5 層木蠟油塗裝，保留最原始的木紋肌理，同時賦予耐磨防水的長效保護；吧台底部以黃銅管燈勾勒輪廓，在暖色光氛中散發獨一無二的溫潤光澤。',
      '牆面品牌色調由南源職人依品牌 Pantone 色號現場精密調配——從深琥珀棕牆到煙燻黑天花板，每一道顏色均經過三次比色確認，以靜電噴塗工藝完成均勻細緻的頂級塗裝，完全無橘皮、無流掛。',
      '開幕首週，社群媒體上湧現超過 500 篇顧客自發打卡文，品牌旗艦店成功轉化為「打卡聖地 + 品牌體驗場域」，完美實現商業空間的最高使命。',
    ],
  },
  {
    id:          '9',
    category:    'partial',
    title:       '機能小宅改造',
    subtitle:    '22坪空間極大化',
    type:        '局部空間改造 / PARTIAL RENOVATION',
    location:    '台北市文山區',
    size:        '22坪',
    year:        '2025',
    budget:      '58萬',
    designFocus: '多功能架高木質地坪、隱藏式收納極大化、系統與手作混搭精製',
    materials:   '高級樺木合板、低甲醛全室系統櫃、雙面塗裝板、LED 線性燈',
    highlight:   '架高木地坪隱藏收納 × 可掀式多功能桌板 × 小預算精品落地',
    img:         projPhoto02,
    altText:     '南源木材 機能小宅改造 架高木地坪隱藏收納完工實景',
    beforeImg:   projPhoto12,
    beforeAlt:   '南源木材 小宅改裝前 陰暗老舊天花板格局拆除現場',
    afterImg:    projPhoto02,
    afterAlt:    '南源木材 文山區小宅完工後 架高地坪多功能收納空間實景',
    galleryImgs: [projPhoto07, projPhoto11],
    description: [
      '22 坪需同時滿足臥室、書房、客廳與大量收納，總預算嚴格控制在 60 萬以內——這是南源最能體現「精準選材+機能設計」功力的小宅改造挑戰。',
      '核心設計以「多功能架高木質地坪」展開：客廳區域架高 40 公分，地坪下方全面規劃為抽屜式收納，地坪上方搭配可掀式桌板，白天是工作區、晚上攤平即為客臥，單一空間同時承擔三種生活功能。',
      '主臥隱藏式收納極大化：床頭兩側對稱衣廚、床底液壓掀床、牆面頂天立地書牆，所有收納系統採用低甲醛 F1 材料，讓業主在純淨空氣中好眠，也讓每吋空間都被高效利用。',
      '「小預算不等於妥協品質」是這個案例的最大精神——透過南源精準的選材配置與機能設計思維，22 坪擁有了超越坪數三倍的視覺開闊感與生活機能，完美實現小資業主的精品居住夢想。',
    ],
  },
  {
    id:          '10',
    category:    'partial',
    title:       '沐光精品衛浴',
    subtitle:    '大理石飯店級沐浴',
    type:        '局部空間改造 / PARTIAL RENOVATION',
    location:    '台北市天母區',
    size:        '10坪衛浴',
    year:        '2025',
    budget:      '120萬',
    designFocus: '大理石 bookmatching 對花主牆、懸浮木質浴櫃、無框淋浴屏整合',
    materials:   '義大利 Nero Marquina 黑色大理石、北美白橡木浴櫃板、德國 Hansgrohe 恆溫花灑',
    highlight:   '大理石對花主牆 × 懸浮橡木浴櫃 × 無框玻璃恆溫花灑系統',
    img:         projPhoto14,
    altText:     '南源木材 沐光精品衛浴 大理石對花懸浮浴櫃完工實景',
    beforeImg:   projPhoto10,
    beforeAlt:   '南源木材 衛浴壁磚敲除與防水底層重建施工現場',
    afterImg:    projPhoto14,
    afterAlt:    '南源木材 Nero Marquina 大理石對花主牆與無框淋浴門完工細節',
    galleryImgs: [projPhoto15, projPhoto06],
    description: [
      '僅 10 坪的衛浴空間，業主卻要求「比五星飯店浴室更奢華」。南源接下這個近乎苛刻的挑戰，以義大利 Nero Marquina 黑色大理石大板為主牆，採用 bookmatching 對花工法，完美呈現鏡面對稱的自然紋理，震撼視覺。',
      '浴櫃以北美白橡木搭配黃銅拉手，底部懸浮設計配合 LED 地腳燈，製造輕盈漂浮感。淋浴區採用無框超白玻璃屏風（10mm 安全鋼化玻璃），搭配德國 Hansgrohe 恆溫花灑系統，36 秒即可達到設定水溫，從此告別冷水浪費。',
      '地坪以 600×1200mm 義大利進口大板斜切 45 度拼貼，視覺上拉長空間縱深；所有填縫劑採抗菌防霉配方，長效維持潔白品質，避免傳統填縫劑發黑發霉的困擾。',
      '每一片石材、每一個五金件，都經過南源團隊的嚴格三道篩選。「小空間也值得被認真對待」——這就是南源局部改造的最高信仰，也是業主第一次進浴室便落淚感動的原因。',
    ],
  },
];


/* ═══════════════════════════════════════════════════════════════
   FADE-IN (scroll-driven reveal via framer-motion)
═══════════════════════════════════════════════════════════════ */
const FadeIn: React.FC<{
  children:   React.ReactNode;
  className?: string;
  delay?:     number;
}> = ({ children, className = '', delay = 0 }) => {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};


/* ═══════════════════════════════════════════════════════════════
   BEFORE / AFTER SLIDER
   ─────────────────────────────────────────────────────────────
   ZERO inline styles.
   backgroundImage → <img> tags (object-fit: cover in CSS).
   clipPath + left  → DOM ref mutations after mount.
   This satisfies strict 100% separation of concerns.
═══════════════════════════════════════════════════════════════ */
const BeforeAfterSlider: React.FC<{
  beforeImg: string;
  beforeAlt: string;
  afterImg:  string;
  afterAlt:  string;
}> = ({ beforeImg, beforeAlt, afterImg, afterAlt }) => {
  const boxRef     = useRef<HTMLDivElement>(null);
  const clipRef    = useRef<HTMLDivElement>(null);
  const handleRef  = useRef<HTMLDivElement>(null);

  const applyPos = (pct: number) => {
    const p = Math.max(5, Math.min(95, pct));
    if (clipRef.current)   clipRef.current.style.clipPath = `polygon(0 0,${p}% 0,${p}% 100%,0 100%)`;
    if (handleRef.current) handleRef.current.style.left   = `${p}%`;
  };

  useEffect(() => { applyPos(50); }, []);

  const onX = (cx: number) => {
    if (!boxRef.current) return;
    const r = boxRef.current.getBoundingClientRect();
    applyPos(((cx - r.left) / r.width) * 100);
  };

  return (
    <div
      ref={boxRef}
      className="ba-slider-container"
      onMouseDown={e => onX(e.clientX)}
      onMouseMove={e => { if (e.buttons === 1) onX(e.clientX); }}
      onTouchStart={e => onX(e.touches[0].clientX)}
      onTouchMove={e => onX(e.touches[0].clientX)}
    >
      {/* After layer — full-width image */}
      <div className="ba-after-layer">
        <img src={afterImg} alt={afterAlt} className="ba-img" />
        <div className="ba-label ba-label--after">完工後 AFTER</div>
      </div>

      {/* Before layer — clipped by ref */}
      <div ref={clipRef} className="ba-before-layer">
        <img src={beforeImg} alt={beforeAlt} className="ba-img" />
        <div className="ba-label ba-label--before">施工前 BEFORE</div>
      </div>

      {/* Handle — position driven by ref */}
      <div ref={handleRef} className="ba-handle-line">
        <div className="ba-handle-circle">
          <span className="ba-handle-arrows">⟨⟩</span>
        </div>
      </div>
    </div>
  );
};


/* ═══════════════════════════════════════════════════════════════
   PROJECT CARD
═══════════════════════════════════════════════════════════════ */
const ProjectCard: React.FC<{
  project: Project;
  delay:   number;
  onClick: () => void;
}> = ({ project, delay, onClick }) => (
  <FadeIn delay={delay}>
    <article onClick={onClick} className="portfolio-card">

      <div className="portfolio-img-container">
        <img
          src={project.img}
          alt={project.altText}
          className="portfolio-img"
          loading="lazy"
        />
        <div className="portfolio-badge-cat">
          {CATEGORIES.find(c => c.id === project.category)?.en ?? ''}
        </div>
        <div className="portfolio-badge-year">{project.year}</div>
        <div className="portfolio-img-gradient" />
      </div>

      <div className="portfolio-card-body">
        <div className="portfolio-card-hdr">
          <div>
            <h3 className="portfolio-card-title">{project.title}</h3>
            <p  className="portfolio-card-sub">{project.subtitle}</p>
          </div>
          <div className="portfolio-card-meta-col">
            <span className="portfolio-badge-size">{project.size}</span>
            <span className="portfolio-badge-loc">{project.location}</span>
          </div>
        </div>

        <div className="portfolio-specs">
          <div className="portfolio-spec-row">
            <span className="portfolio-spec-label">設計重點</span>
            <span className="portfolio-spec-val">{project.designFocus}</span>
          </div>
          <div className="portfolio-spec-row">
            <span className="portfolio-spec-label">使用材料</span>
            <span className="portfolio-spec-val">{project.materials}</span>
          </div>
        </div>

        <div className="portfolio-highlight-bar">
          <p className="portfolio-highlight">{project.highlight}</p>
        </div>

        <div className="portfolio-card-action">
          <span className="portfolio-action-text">查看完整案例 ➔</span>
        </div>
      </div>

    </article>
  </FadeIn>
);


/* ═══════════════════════════════════════════════════════════════
   PROJECT DETAIL OVERLAY
═══════════════════════════════════════════════════════════════ */
const ProjectDetail: React.FC<{
  project: Project;
  onClose: () => void;
}> = ({ project, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.35 }}
    className="detail-overlay"
  >
    <div className="detail-scroll">

      <button
        onClick={onClose}
        className="detail-close-btn"
        aria-label="關閉作品詳情"
      >
        ✕
      </button>

      {/* Hero image */}
      <div className="detail-hero-banner">
        <img src={project.img} alt={project.altText} className="detail-hero-img" />
        <div className="detail-hero-grad" />
        <div className="detail-hero-tags">
          <span className="detail-tag detail-tag--type">{project.type}</span>
          {[project.location, project.size, project.year, `預算 ${project.budget}`].map(tag => (
            <span key={tag} className="detail-tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="container detail-body">

        <div className="detail-title-block">
          <h2 className="detail-title">{project.title}</h2>
          <p  className="detail-title-sub">{project.subtitle}</p>
        </div>

        <div className="detail-highlight-box">
          <p className="detail-highlight-text">{project.highlight}</p>
        </div>

        <div className="detail-desc-wrap">
          {project.description.map((para, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <p className="detail-desc">{para}</p>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="detail-ba-wrap">
          <h3 className="detail-section-h">空間重生：擦除對照</h3>
          <p  className="detail-section-sub">左右拖曳滑桿，見證空間蛻變。</p>
          <BeforeAfterSlider
            beforeImg={project.beforeImg}
            beforeAlt={project.beforeAlt}
            afterImg={project.afterImg}
            afterAlt={project.afterAlt}
          />
        </FadeIn>

        <FadeIn>
          <h3 className="detail-gallery-h">更多細節</h3>
          <div className="detail-gallery-grid">
            {project.galleryImgs.map((gImg, i) => (
              <div className="detail-gallery-item" key={i}>
                <img
                  src={gImg}
                  alt={`南源木材 ${project.title} 施工細節 ${i + 1}`}
                  className="detail-gallery-img"
                  loading="lazy"
                />
                <div className="detail-gallery-overlay" />
              </div>
            ))}
          </div>
        </FadeIn>

      </div>
    </div>
  </motion.div>
);


/* ═══════════════════════════════════════════════════════════════
   FILTER TABS
═══════════════════════════════════════════════════════════════ */
const FilterTabs: React.FC<{
  active:   CategoryId;
  onChange: (id: CategoryId) => void;
}> = ({ active, onChange }) => (
  <div className="filter-track">
    <div className="filter-track-inner">
      {CATEGORIES.map(cat => {
        const isActive = active === cat.id;
        return (
          <div key={cat.id} className="filter-pill-slot">
            {isActive && (
              <motion.div
                layoutId="filter-pill"
                className="filter-pill-bg"
                transition={{ type: 'spring', stiffness: 380, damping: 34, mass: 0.9 }}
              />
            )}
            <button
              onClick={() => onChange(cat.id)}
              className={`filter-pill-btn${isActive ? ' filter-pill-btn--active' : ''}`}
              aria-label={`篩選 ${cat.label}`}
            >
              <span className={`filter-pill-zh${isActive ? ' filter-pill-zh--active' : ''}`}>
                {cat.label}
              </span>
              <span className={`filter-pill-en${isActive ? ' filter-pill-en--active' : ''}`}>
                {cat.en}
              </span>
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    key="wire"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{   scaleX: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
                    className="filter-pill-wire"
                  />
                )}
              </AnimatePresence>
            </button>
          </div>
        );
      })}
    </div>
  </div>
);


/* ═══════════════════════════════════════════════════════════════
   PROJECTS PAGE
═══════════════════════════════════════════════════════════════ */
const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryId>('all');
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedId = searchParams.get('project');

  const filtered = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  const selectedProject = selectedId
    ? PROJECTS.find(p => p.id === selectedId) ?? null
    : null;

  const handleFilterChange = (id: CategoryId) => {
    setActiveFilter(id);
    setSearchParams({});
  };

  return (
    <main className="projects-page">
      <div className="container projects-container">

        {/* Page header */}
        <section className="projects-hdr-section">
          <FadeIn>
            <h1 className="projects-title">作品案例</h1>
            <p className="projects-subtitle">
              南源木材高端住宅、職人木作、商業空間與老屋翻修精工作品。台北、新竹、台中全屋統包翻新設計案例一覽。
            </p>
          </FadeIn>
        </section>

        {/* Filter tabs — horizontally centred on desktop */}
        <section>
          <FilterTabs active={activeFilter} onChange={handleFilterChange} />
        </section>

        {/* Count */}
        <div className="projects-count-bar">
          <span className="projects-count-text">
            顯示 {filtered.length} / {PROJECTS.length} 件作品
          </span>
        </div>

        {/* Card grid */}
        <section>
          <motion.div layout className="projects-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  className="projects-grid-item"
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1,    y: 0  }}
                  exit={{    opacity: 0, scale: 0.96, y: 20 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                >
                  <ProjectCard
                    project={project}
                    delay={i * 0.04}
                    onClick={() => setSearchParams({ project: project.id })}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

      </div>

      {/* Unified global CTA — single instance */}
      <CTA />

      {/* Detail overlay */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSearchParams({})}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default Projects;
