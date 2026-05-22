import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import './Blog.css';

const BLOG_POSTS = [
  {
    id: 1,
    title: '木地板怎麼選？實木、海島型與超耐磨的優缺點全解析',
    category: '選材指南',
    date: '2023-10-15',
    img: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=600&q=80',
    summary: '市面上木地板種類繁多，到底哪一種最適合你家？從我們的木材專業角度，帶你一次看懂各種地板的特性與保養方法。'
  },
  {
    id: 2,
    title: '老屋翻新預算怎麼抓？這 3 大基礎工程絕不能省',
    category: '裝修知識',
    date: '2023-09-28',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
    summary: '買了老屋想翻新，預算卻不知道怎麼分配？告訴你水電管線、防水防漏與結構補強為什麼是裝修中最重要的一環。'
  },
  {
    id: 3,
    title: '告別裝修蟑螂！簽約前必看的 5 個自保細節',
    category: '工程管理',
    date: '2023-09-10',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    summary: '裝修糾紛時有所聞，如何確保自己的權益？南源教你從報價單明細、合約條款到付款階段，步步為營。'
  },
  {
    id: 4,
    title: '系統櫃 vs 木作櫃？設計師沒告訴你的空間收納真相',
    category: '設計觀點',
    date: '2023-08-22',
    img: 'https://images.unsplash.com/photo-1595514535415-84617565df4b?auto=format&fit=crop&w=600&q=80',
    summary: '收納是每個家庭的痛點。到底該選擇量身打造的木作櫃，還是環保高效率的系統櫃？這篇文章幫你釐清需求。'
  },
  {
    id: 5,
    title: '打造會呼吸的家：什麼是 F1/F2 低甲醛綠建材？',
    category: '選材指南',
    date: '2023-08-05',
    img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    summary: '裝潢完總是有一股刺鼻味？了解甲醛對人體的危害，以及如何在裝修時正確選擇符合健康標準的環保建材。'
  },
  {
    id: 6,
    title: '商業空間設計：如何透過動線與燈光提升營業額？',
    category: '商空設計',
    date: '2023-07-18',
    img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&q=80',
    summary: '好的商空設計不只好看，更能引導顧客消費。解析咖啡廳與服飾店的成功設計法則。'
  }
];

const Blog: React.FC = () => {
  return (
    <motion.div 
      className="page-container bg-light"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <div className="page-header">
        <h1>裝修知識</h1>
        <p>專業分享，讓您在裝修路上不走彎路</p>
      </div>

      <div className="container section-padding">
        <div className="blog-grid">
          {BLOG_POSTS.map((post, idx) => (
            <motion.article 
              key={post.id} 
              className="blog-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="blog-img-wrapper">
                <img src={post.img} alt={post.title} />
                <span className="blog-category">{post.category}</span>
              </div>
              <div className="blog-content">
                <div className="blog-meta">
                  <Calendar size={16} />
                  <span>{post.date}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); alert('文章內容建置中'); }}>
                  閱讀全文 <ArrowRight size={16} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;
