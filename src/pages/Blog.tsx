import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import './Blog.css';

const BLOG_POSTS = [
  {
    id: 1,
    title: '老屋翻新前，一定要先確認的 5 件事',
    category: '老屋翻新',
    date: '2026-05-10',
    img: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=600&q=80',
    readTime: '5 min',
    summary: '老公寓漏水、壁癌、管線老化...翻新前必須做足哪些功課？南源帶您從「結構安全」到「基礎工程」逐一盤點關鍵檢核要點。'
  },
  {
    id: 2,
    title: '裝修預算為什麼會追加？',
    category: '裝修預算',
    date: '2026-04-28',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    readTime: '6 min',
    summary: '拆解裝修市場上常見的「追加陷阱」，從估價單的魔鬼細節到施工中的臨時變更，教您如何從材料源頭杜絕不合理的預算追加。'
  },
  {
    id: 3,
    title: '木作工程怎麼看品質？',
    category: '材料知識',
    date: '2026-04-15',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
    readTime: '4 min',
    summary: '接合處的精度、板材含水率防潮性、防蟲防甲醛認證與五金承重表現，這篇文章帶您用專業眼光檢驗職人木作櫃體與結構品質。'
  },
  {
    id: 4,
    title: '防水工程為什麼不能省？',
    category: '施工流程',
    date: '2026-03-20',
    img: 'https://images.unsplash.com/photo-1595514535415-84617565df4b?auto=format&fit=crop&w=600&q=80',
    readTime: '5 min',
    summary: '漏水是居家生活最難根治的痛。本篇拆解南源特有的三層防水阻水結構，與 48-72 小時蓄水測試，深入分析如何做到滴水不漏。'
  },
  {
    id: 5,
    title: '室內設計與統包有什麼不同？',
    category: '空間設計',
    date: '2026-03-05',
    img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    readTime: '5 min',
    summary: '到底該找設計師繪圖，還是直接委託統包工程？兩者在溝通成本、施工品質、監造回報上有何核心差異？看完此篇不再糾結。'
  },
  {
    id: 6,
    title: '第一次裝修該怎麼開始？',
    category: '施工流程',
    date: '2026-02-18',
    img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&q=80',
    readTime: '7 min',
    summary: '給裝修新手的全方位指南！從梳理生活需求、抓取合理預算，到現場丈量與挑選木作建材的 8 大階段，陪您一步步安心啟航。'
  }
];

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const categories = ['全部', '老屋翻新', '材料知識', '施工流程', '裝修預算', '空間設計'];

  const filteredPosts = selectedCategory === '全部' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === selectedCategory);

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      style={{ backgroundColor: '#050505', minHeight: '100vh' }}
    >
      <div className="page-header">
        <h1>裝修知識</h1>
        <p>專業分享，讓您在裝修路上不走彎路</p>
      </div>

      <div className="container section-padding">
        
        {/* Category Tabs */}
        <div className="d-flex flex-wrap justify-content-center gap-2 gap-md-3 mb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-3 py-2 transition-all font-light"
              style={{
                fontSize: '13px',
                letterSpacing: '0.05em',
                backgroundColor: selectedCategory === cat ? '#C5A880' : 'rgba(255, 255, 255, 0.02)',
                color: selectedCategory === cat ? '#050505' : 'rgba(255, 255, 255, 0.7)',
                border: selectedCategory === cat ? '1px solid #C5A880' : '1px solid rgba(197, 168, 128, 0.15)',
                transition: 'all 0.3s ease',
                fontWeight: selectedCategory === cat ? 600 : 300,
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Cards Grid */}
        <div className="row g-4">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, idx) => (
              <div className="col-12 col-md-6 col-lg-4" key={post.id}>
                <motion.article 
                  className="rounded-1 overflow-hidden h-100 d-flex flex-column"
                  style={{
                    backgroundColor: '#0D0D0E',
                    border: '1px solid rgba(197, 168, 128, 0.1)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ y: -6, borderColor: '#C5A880' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <div className="position-relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                    <img src={post.img} className="w-100 h-100" style={{ objectFit: 'cover', opacity: 0.8 }} alt={post.title} />
                    <span className="position-absolute top-3 start-3 px-2 py-1" style={{ fontSize: '10px', color: '#050505', backgroundColor: '#C5A880', fontWeight: 500 }}>
                      {post.category}
                    </span>
                  </div>
                  <div className="p-4 flex-grow-1 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-3" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
                        <Calendar size={14} />
                        <span>{post.date}</span>
                        <span className="ms-2">| 閱讀：{post.readTime}</span>
                      </div>
                      <h3 className="mb-3" style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff', lineHeight: 1.4 }}>{post.title}</h3>
                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: 300, lineHeight: 1.8, marginBottom: '2rem' }}>{post.summary}</p>
                    </div>
                    <div className="pt-3 border-top border-white/5">
                      <a href="#" className="d-inline-flex align-items-center gap-2" style={{ fontSize: '12px', color: '#C5A880', fontWeight: 400 }} onClick={(e) => { e.preventDefault(); alert('文章內容建置中'); }}>
                        閱讀全文 ➔
                      </a>
                    </div>
                  </div>
                </motion.article>
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;
