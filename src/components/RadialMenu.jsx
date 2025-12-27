import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Youtube, Code, TrendingUp, Activity, Sun, DollarSign, 
  Heart, User, Utensils, MessageCircle, HelpCircle, Link
} from "lucide-react";
import "./RadialMenu.css";

// Icon map for fallback
const ICON_MAP = {
  activity: <Activity size={20} />,
  sun: <Sun size={20} />,
  trending: <TrendingUp size={20} />,
  dollar: <DollarSign size={20} />,
  heart: <Heart size={20} />,
  user: <User size={20} />,
  code: <Code size={20} />,
  utensils: <Utensils size={20} />,
  message: <MessageCircle size={20} />,
  help: <HelpCircle size={20} />,
  link: <Link size={20} />
};

const RadialMenu = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // FIX: Reduced RADIUS to prevent icons from being cut off
  const RADIUS = 130;
  const START_ANGLE = 180;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="radial-wrapper">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="menu-center">
        <motion.button
          className="trigger-btn"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isOpen ? 45 : 0 }}
        >
          <Youtube size={40} fill="white" />
        </motion.button>

        <AnimatePresence>
          {isOpen &&
            items.map((item, index) => {
              const angleStep = 360 / items.length;
              const angle = START_ANGLE + index * angleStep;
              const radian = (angle * Math.PI) / 180;
              const x = RADIUS * Math.cos(radian);
              const y = RADIUS * Math.sin(radian);

              // LOGIC: If there's an image URL, use it. Otherwise, use the icon.
              let content;
              if (item.img) {
                content = <img src={item.img} alt={item.label} className="menu-icon-img" />;
              } else {
                content = ICON_MAP[item.icon] || <Link size={20} />;
              }

              return (
                <motion.a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="menu-item"
                  title={item.label}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{ 
                    x: x, 
                    y: y, 
                    opacity: 1, 
                    scale: 1,
                    transition: { delay: index * 0.03, type: "spring", stiffness: 200, damping: 15 }
                  }}
                  exit={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                >
                  {content}
                </motion.a>
              );
            })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RadialMenu;