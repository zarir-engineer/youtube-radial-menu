import React, { useState } from 'react';
import { X, Plus, Trash2, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsModal = ({ items, onSave, onClose, onDelete }) => {
  const [newItem, setNewItem] = useState({ label: '', url: '' });

  const handleAdd = () => {
    if (newItem.label && newItem.url) {
      // Default new items to the 'link' icon
      onSave({ ...newItem, icon: 'link' });
      setNewItem({ label: '', url: '' });
    }
  };

  return (
    <div className="settings-overlay">
      <motion.div 
        className="settings-modal"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="settings-header">
          <h2>CONFIGURE LINKS</h2>
          <button onClick={onClose} className="close-btn"><X /></button>
        </div>

        <div className="settings-body">
          {/* Add New Section */}
          <div className="add-section">
            <input 
              placeholder="Label (e.g. My Channel)" 
              value={newItem.label}
              onChange={(e) => setNewItem({...newItem, label: e.target.value})}
            />
            <input 
              placeholder="YouTube URL" 
              value={newItem.url}
              onChange={(e) => setNewItem({...newItem, url: e.target.value})}
            />
            <button onClick={handleAdd} className="add-btn">
              <Plus size={18} /> Add
            </button>
          </div>

          {/* List Section */}
          <div className="items-list">
            {items.map((item, idx) => (
              <div key={idx} className="list-item">
                <span>{item.label}</span>
                <button onClick={() => onDelete(idx)} className="delete-btn">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsModal;