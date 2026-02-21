let body = $response.body;
let url = $request.url;
let obj = JSON.parse(body);

try {
  // 处理开屏广告
  if (/\/api\/v\d\/startup/.test(url)) {
    if (obj?.data?.settings?.NOTICE) {
      delete obj.data.settings.NOTICE;
    }
    if (obj?.data?.splash_ad) {
      obj.data.splash_ad.enabled = false;
      obj.data.splash_ad.overtime = 0;
    }
  }

  // 处理标签页广告
  if (/\/api\/v\d\/ads/.test(url)) {
    if (obj?.data) {
      obj.data.ads = null;
    }
  }

  // 处理播放页VIP横幅
  if (/\/api\/v4\/movies/.test(url)) {
    if (obj?.data) {
      obj.data.show_vip_banner = false;
    }
  }
} catch (error) {
  console.log('JAVDB广告过滤出错: ' + error);
  // 忽略错误
}

$done({ body: JSON.stringify(obj) });
