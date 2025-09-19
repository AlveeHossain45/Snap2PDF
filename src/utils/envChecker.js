// src/utils/envChecker.js

// এই ফাংশনটি চেক করে বলবে আমরা কোনো ইন-অ্যাপ ব্রাউজারে আছি কিনা
export function isInAppBrowser() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // Facebook, Instagram, এবং অন্যান্য WebView-এর কমন সিগনেচার
    return (
      /FBAN|FBAV/i.test(userAgent) || // Facebook
      /Instagram/i.test(userAgent) || // Instagram
      /wv\)/.test(userAgent) || // Android WebView
      /Messenger/i.test(userAgent) // Facebook Messenger
    );
  }