import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { Input, Button, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { request } from 'umi';

const key = 'HGFBZ-VLLK2-FZZUF-CKQ22-YJWGV-GSF7G';

const mockVal = (str: string, repeat: number = 1) => ({
  value: str.repeat(repeat),
});
const Index = forwardRef((props: any, ref: any) => {
  const mapDom = useRef<any>();
  const [keyword, setKeyword] = useState<any>('');
  const [region, setRegion] = useState<any>('');
  const [markers, setMarkers] = useState<any>([]);
  const [searchService, setSearchService] = useState<any>([]);
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const init = function() {
    // QQMap.init('HGFBZ-VLLK2-FZZUF-CKQ22-YJWGV-GSF7G', () => {
    var map = new qq.maps.Map(mapDom.current, {
      center: new qq.maps.LatLng(39.916527, 116.397128),
      zoom: 13,
    });

    // 调用检索
    let latlngBounds = new qq.maps.LatLngBounds();
    var marker: any;
    let searchService: any = []; //调用百度地图的搜索服务

    searchService = new qq.maps.SearchService({
      complete: (results: any) => {
        console.log(results, '------------------');
        let pois = results.detail.pois;
        for (let i = 0, l = pois.length; i < l; i++) {
          let poi = pois[i];
          latlngBounds.extend(poi.latLng);
          if (!marker) {
            marker = new qq.maps.Marker({
              map: map,
              id: '1',
              position: poi.latLng,
              animation: qq.maps.MarkerAnimation.BOUNCE,
            });
          }
          marker.setTitle(i + 1);
          setMarkers((markers: any[]) => markers.push(marker));
        }
        map.fitBounds(latlngBounds);
      },
    });
    setSearchService(searchService);

    //添加监听事件
    qq.maps.event.addListener(map, 'click', function(event: any) {
      console.log('您点击了地图.', event);
      if (!marker) {
        if (ref) {
          ref.current = event.latLng;
        }
        marker = new qq.maps.Marker({
          id: '1',
          position: event.latLng,
          map: map,
          animation: qq.maps.MarkerAnimation.BOUNCE,
        });
      }
      marker.setPosition(event.latLng);
    });
    // });
  };
  //搜索
  const searchKeyword = () => {
    //获取文本框输入的值
    // 清空上一次搜索结果
    Array.from(markers).forEach((marker: any) => {
      marker.setMap(null);
    });
    //调用腾讯地图的搜索功能
    console.log(searchService);
    searchService.setLocation(region);
    searchService.search(keyword);
  };
  const onChange = (data: string) => {
    setKeyword(data);
  };
  const onSelect = (data: string) => {
    console.log('onSelect', data);
  };

  const onSearch = (searchText: string) => {
    request('https://apis.map.qq.com/ws/place/v1/suggestion', {
      method: 'get',
      params: {
        keyword,
        region,
        key,
      },
    }).then((res: any) => {
      console.log(res);
    });
    // setOptions(
    //   !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    // );
  };
  useEffect(() => {
    init();
  }, []);
  console.log('腾讯地图初始化', qq);
  return (
    <>
      {/* <div>
        <Input id="region" value={region} onChange={e => setRegion(e.currentTarget.value)} style={{ width: '150px' }} defaultValue={'北京'} placeholder="城市" />
        <AutoComplete
          value={keyword}
          options={options}
          style={{ width: '150px' }}
          onSelect={onSelect}
          onSearch={onSearch}
          onChange={onChange}
          placeholder="地址"
        />
        <Button type="primary" icon={<SearchOutlined />} onClick={searchKeyword}>搜索</Button>
      </div> */}
      <div style={{ width: '100%', height: '500px' }} ref={mapDom}></div>
    </>
  );
});

export default Index;
