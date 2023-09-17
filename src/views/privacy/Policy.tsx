import { Container, Typography, useTheme } from '@mui/material';
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <Container
      sx={{
        marginTop: 2,
        minHeight: '100vh',
      }}
    >
      <Typography variant='h5' paragraph={true}>
        {'Chính sách bảo mật'}
      </Typography>
      <Typography paragraph={true}>
        {
          'Chào mừng đến với ứng dụng và trang web "AI Chứng Khoán". Chính sách bảo mật này sẽ giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn khi bạn sử dụng ứng dụng và trang web của chúng tôi.'
        }
      </Typography>
      <Typography variant='h6' paragraph={true}>
        {'Sử dụng Google Analytics và Google Crashlytics'}
      </Typography>
      <Typography paragraph={true}>
        {
          'Chúng tôi sử dụng Google Analytics và Firebase Crashlytics để thu thập thông tin về cách người dùng sử dụng ứng dụng và trang web của chúng tôi. Chúng tôi sử dụng thông tin này để cải thiện trải nghiệm người dùng và tối ưu hóa ứng dụng và trang web của chúng tôi.'
        }
      </Typography>
      <Typography paragraph={true}>
        {
          'Google Analytics và Google Crashlytics sử dụng cookie để thu thập thông tin. Các cookie là các tệp văn bản nhỏ được lưu trữ trên máy tính của bạn và được sử dụng để thu thập thông tin không nhận dạng cá nhân, chẳng hạn như loại trình duyệt và trang được xem.'
        }
      </Typography>
      <Typography variant='h6' paragraph={true}>
        {'Không thu thập thông tin cá nhân'}
      </Typography>
      <Typography paragraph={true}>
        {
          'Ứng dụng và trang web của chúng tôi không thu thập bất kỳ thông tin cá nhân nào từ người dùng. Chúng tôi chỉ thu thập thông tin không nhận dạng cá nhân bằng Google Analytics và Google Crashlytics như đã mô tả ở trên.'
        }
      </Typography>
      <Typography variant='h6' paragraph={true}>
        {'Bảo vệ thông tin của bạn'}
      </Typography>
      <Typography paragraph={true}>
        {
          'Chúng tôi cam kết bảo vệ thông tin của bạn. Chúng tôi sử dụng các biện pháp bảo vệ để ngăn chặn truy cập trái phép hoặc sử dụng sai thông tin của bạn.'
        }
      </Typography>
      <Typography paragraph={true}>
        {
          'Chúng tôi không chia sẻ thông tin của bạn với bên thứ ba trừ khi yêu cầu bởi pháp luật hoặc để bảo vệ quyền lợi của chúng tôi.'
        }
      </Typography>
      <Typography variant='h6' paragraph={true}>
        {'Liên hệ'}
      </Typography>
      <Typography paragraph={true}>
        {
          'Nếu bạn có bất kỳ câu hỏi hoặc đề xuất nào về chính sách bảo mật của chúng tôi, vui lòng liên hệ với chúng tôi qua email admin@aichungkhoan.info.'
        }
      </Typography>
      <Typography paragraph={true}>{'Cám ơn bạn đã sử dụng ứng dụng và trang web của chúng tôi!'}</Typography>
    </Container>
  );
}
