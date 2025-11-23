import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const TestPage = () => {
  useEffect(() => {
    console.log('🧪 测试页面加载');
    
    const testConnection = async () => {
      console.log('🧪 开始测试 Supabase 连接');
      
      try {
        const { data, error } = await supabase
          .from('heritage_themes')
          .select('*')
          .limit(1);
        
        console.log('🧪 测试结果:', { data, error });
        
        if (error) {
          console.error('❌ 测试失败:', error);
        } else {
          console.log('✅ 测试成功:', data);
        }
      } catch (err) {
        console.error('❌ 测试异常:', err);
      }
    };
    
    testConnection();
  }, []);

  return <div>测试页面 - 查看控制台</div>;
};