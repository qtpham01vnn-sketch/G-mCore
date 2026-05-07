/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AIDigitize from './pages/AIDigitize';
import VersionComparison from './pages/Comparison';
import FormulaDetail from './pages/FormulaDetail';
import Factories from './pages/Factories';
import Planning from './pages/Planning';

import HistoryPage from './pages/History';

export default function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [selectedProductId, setSelectedProductId] = React.useState<string | null>(null);

  const renderContent = () => {
    // If a product is selected, show its detail regardless of the activeTab 
    // unless the user changes tab clearly
    if (selectedProductId && activeTab === 'products') {
      return (
        <FormulaDetail 
          productId={selectedProductId} 
          onBack={() => setSelectedProductId(null)} 
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products onSelectProduct={setSelectedProductId} />;
      case 'ai-digitize':
        return <AIDigitize />;
      case 'planning':
        return <Planning />;
      case 'history':
        return <HistoryPage />;
      case 'factories':
        return <Factories />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center text-slate-500 shadow-2xl">
              <span className="text-3xl font-black italic">!</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Tính năng đang phát triển</h3>
              <p className="text-slate-400 font-medium max-w-sm">Dữ liệu về {activeTab} sẽ sớm được AI GốmCore tổng hợp và hiển thị trong phiên bản tiếp theo.</p>
            </div>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="btn-primary"
            >
              Quay lại Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={(tab) => {
      setActiveTab(tab);
      setSelectedProductId(null); // Reset detail view when changing tab
    }}>
      {renderContent()}
    </Layout>
  );
}
