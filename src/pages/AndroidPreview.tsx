import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Wifi, Battery, Signal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AndroidPreview: React.FC = () => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      setTimeout(() => {
        setPaymentComplete(false);
        setAmount('');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('androidPreview.backToHome')}
        </Link>
        <h1 className="text-xl font-bold text-gray-800">{t('androidPreview.title')}</h1>
        <div className="w-20"></div>
      </div>

      {/* Android Device Frame */}
      <div className="flex justify-center items-center py-8">
        <div className="relative">
          {/* Device Frame */}
          <div className="w-80 h-[600px] bg-black rounded-3xl p-4 shadow-2xl">
            {/* Status Bar */}
            <div className="flex justify-between items-center text-white text-xs mb-2">
              <div className="flex items-center space-x-1">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
              </div>
              <div className="text-center font-medium">14:30</div>
              <div className="flex items-center space-x-1">
                <span>85%</span>
                <Battery className="w-3 h-3" />
              </div>
            </div>

            {/* Screen Content */}
            <div className="bg-white rounded-2xl h-full p-4 overflow-hidden">
              {!paymentComplete ? (
                <>
                  {/* POS Header */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CreditCard className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">{t('androidPreview.posHeader')}</h2>
                    <p className="text-gray-600 text-sm">{t('androidPreview.paymentTerminal')}</p>
                  </div>

                  {/* Amount Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('androidPreview.amount')}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">€</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg text-lg font-semibold text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {t('androidPreview.paymentMethod')}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 rounded-lg border-2 flex flex-col items-center space-y-2 transition-colors ${
                          paymentMethod === 'card'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <CreditCard className="w-6 h-6" />
                        <span className="text-xs font-medium">{t('androidPreview.card')}</span>
                      </button>
                      <button
                        onClick={() => setPaymentMethod('contactless')}
                        className={`p-3 rounded-lg border-2 flex flex-col items-center space-y-2 transition-colors ${
                          paymentMethod === 'contactless'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Smartphone className="w-6 h-6" />
                        <span className="text-xs font-medium">{t('androidPreview.contactless')}</span>
                      </button>
                    </div>
                  </div>

                  {/* Payment Button */}
                  <button
                    onClick={handlePayment}
                    disabled={!amount || isProcessing}
                    className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                      !amount || isProcessing
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{t('androidPreview.processing')}</span>
                      </div>
                    ) : (
                      `${t('androidPreview.pay')} €${amount || '0.00'}`
                    )}
                  </button>

                  {/* Transaction Info */}
                  <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>{t('androidPreview.terminalId')}:</span>
                        <span className="font-mono">POS001</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('androidPreview.merchant')}:</span>
                        <span>Demo Store</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('androidPreview.connection')}:</span>
                        <span className="text-green-600">● {t('androidPreview.online')}</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Payment Success Screen */
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">{t('androidPreview.paymentCompleted')}</h3>
                  <p className="text-gray-600 mb-4">€{amount}</p>
                  <div className="text-sm text-gray-500">
                    <p>{t('androidPreview.transactionId')}: TXN{Date.now().toString().slice(-6)}</p>
                    <p>{t('androidPreview.method')}: {paymentMethod === 'card' ? t('androidPreview.creditCard') : t('androidPreview.contactless')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Device Label */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-sm text-gray-600 font-medium">{t('androidPreview.simulationLabel')}</p>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">{t('androidPreview.featuresTitle')}</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">{t('androidPreview.mainFeatures')}</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {t('androidPreview.features.cardPayments')}</li>
                <li>• {t('androidPreview.features.contactlessSupport')}</li>
                <li>• {t('androidPreview.features.touchInterface')}</li>
                <li>• {t('androidPreview.features.secureConnection')}</li>
                <li>• {t('androidPreview.features.digitalReceipts')}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">{t('androidPreview.techSpecs')}</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {t('androidPreview.specs.androidCompatible')}</li>
                <li>• {t('androidPreview.specs.endToEndEncryption')}</li>
                <li>• {t('androidPreview.specs.offlineMode')}</li>
                <li>• {t('androidPreview.specs.autoUpdates')}</li>
                <li>• {t('androidPreview.specs.multiLanguage')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AndroidPreview;