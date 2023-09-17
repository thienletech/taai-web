import { Box, Card, CardContent, CardHeader, Container, List, ListItem, Typography, useTheme } from '@mui/material';
import React from 'react';

export default function ChartInfo() {
  const theme = useTheme();
  return (
    <Box sx={{ marginTop: 4 }}>
      <Card
        sx={{
          background: theme.palette.background.chart,
          minWidth: 275,
          border: `1px solid ${theme.palette.grey[300]}`,
          borderRadius: theme.shape.borderRadius,
          margin: theme.spacing(3),
          padding: theme.spacing(2),
        }}
      >
        <CardHeader
          title={'Thông tin bổ sung'}
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        />
        <CardContent>
          <Typography variant='h6' paragraph={true}>
            {'AI Chứng Khoán là gì?'}
          </Typography>
          <Typography variant='body1' paragraph={true}>
            {
              'AI Chứng Khoán (Technical Analysis AI - TAAI) là một công cụ được sử dụng để dự đoán xu hướng giá cổ phiếu trên thị trường chứng khoán Việt Nam. TAAI đạt được điều này bằng cách sử dụng một mô hình Long Short-Term Memory (LSTM), một loại mạng nơ-ron nhân tạo đặc biệt phù hợp để nhận ra các mẫu trong dữ liệu tuần tự, chẳng hạn như dữ liệu chuỗi thời gian. Bằng cách phân tích dữ liệu giá cổ phiếu lịch sử của các công ty niêm yết trên thị trường chứng khoán Việt Nam, mô hình LSTM có thể xác định các mẫu và xu hướng có thể là dấu hiệu của các chuyển động giá trong tương lai. Điều này cho phép TAAI tạo ra các dự đoán về giá cổ phiếu trong tương lai với độ chính xác cao, cung cấp thông tin quý giá cho các nhà đầu tư và nhà giao dịch. Việc sử dụng Google TensorFlow Keras để tạo ra mô hình LSTM đảm bảo rằng nó được tối ưu hóa và hiệu quả cao, cho phép TAAI xử lý lượng dữ liệu lớn một cách nhanh chóng và chính xác.'
            }
          </Typography>
          <Typography variant='h6' paragraph={true}>
            {'Nguyên tắc hoạt động của AI Chứng Khoán'}
          </Typography>
          <Typography variant='body1' paragraph={true}>
            {
              'Hệ thống AI Chứng Khoán sử dụng dữ liệu giá cổ phiếu được cập nhật hàng ngày để đưa ra dự đoán về xu hướng giá cổ phiếu trong tương lai. Dữ liệu đầu vào bao gồm giá mở cửa, giá cao nhất trong ngày, giá thấp nhất trong ngày, giá đóng cửa và khối lượng giao dich mỗi ngày. Vào cuối mỗi ngày giao dịch, mô hình AI sẽ phân tích dữ liệu mới nhất của từng cổ phiếu và tìm kiếm các mẫu và xu hướng có thể là dấu hiệu của các chuyển động giá trong tương lai. Dựa trên các phân tích này, hệ thống sẽ đưa ra dự đoán về xu hướng giá cổ phiếu trong những ngày kế tiếp.'
            }
          </Typography>
          <Typography variant='h6' paragraph={true}>
            {'Lý thuyết về ứng dụng mô hình LSTM trong dự đoán giá cổ phiếu'}
          </Typography>
          <Typography variant='body1' paragraph={true}>
            {
              'Mô hình LSTM AI là một công cụ mạnh mẽ để dự đoán giá cổ phiếu trong tương lai. Nó sử dụng các thuật toán học máy để phân tích lịch sử giá cổ phiếu và tìm ra các xu hướng và mô hình trong dữ liệu. AI Chứng Khoán sử dụng mô hình LSTM được tạo ra bằng Google TensorFlow Keras, một công cụ mạnh mẽ để tạo ra các mô hình học máy.'
            }
          </Typography>
          <Typography variant='h6' paragraph={true}>
            {'Tham khảo về việc sử dụng mô hình LSTM AI để dự đoán giá cổ phiếu'}
          </Typography>
          <Typography variant='body1' paragraph={true}>
            {
              'Nếu bạn muốn tìm hiểu thêm về việc sử dụng mô hình LSTM AI để dự đoán giá cổ phiếu, bạn có thể tham khảo các tài liệu sau đây:'
            }
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            <ListItem sx={{ display: 'list-item' }}>
              <Typography variant='body1' paragraph={false}>
                {'Stock Price Prediction Using LSTM trên trang web Towards Data Science'}
              </Typography>
            </ListItem>
            <ListItem sx={{ display: 'list-item' }}>
              <Typography variant='body1' paragraph={false}>
                {'Stock Price Prediction Using LSTM and CNN trên trang web Medium'}
              </Typography>
            </ListItem>
          </List>
          <Typography variant='h6' paragraph={true}>
            {'Thông báo miễn trừ trách nhiệm'}
          </Typography>
          <Typography variant='body1' paragraph={true}>
            {
              'Công cụ này chỉ nhằm mục đích cung cấp thông tin tham khảo, không khuyến nghị mời chào mua hay bán. Các nhà đầu tư nên có các nhận định độc lập, kết hợp với nhiều chỉ báo kỹ thuật và chỉ báo cơ bản cũng như tình hình thị trường chung, xem xét các mục tiêu đầu tư cá nhân, tình hình tài chính và nhu cầu đầu tư của mình, tham khảo ý kiến tư vấn từ các chuyên gia về các vấn đề quy phạm pháp luật, tài chính, thuế và các khía cạnh khác trước khi tham gia vào bất kỳ giao dịch nào với cổ phiếu nào. Chúng tôi không chịu trách nhiệm đối với bất kỳ tổn thất tài chính nào hoặc bất kỳ quyết định nào dựa trên công cụ này.'
            }
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
