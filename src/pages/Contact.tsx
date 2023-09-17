import { useForm } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import { TextField, Button, Container, Typography, useTheme, Box } from '@mui/material';
import { useAppSelector } from '@/app/store';
import { Label } from '@mui/icons-material';

const useStyles = (theme: any) =>
  makeStyles({
    form: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '80%',
      margin: '0 auto',
      padding: 16,
      border: '1px solid #ccc',
      borderRadius: 4,
      background: theme.palette.background.chart,
    },
    input: {
      marginBottom: 16,
    },
    button: {
      alignSelf: 'flex-end',
    },
  })();

function Contact() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const { name, email, message } = data;
    const body = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    window.location.href = `mailto:admin@aichungkhoan.info?subject=Contact Form Submission&body=${encodeURIComponent(
      body
    )}`;
  };

  const mode = useAppSelector((state) => state.userReducer.mode) ?? 'dark';
  return (
    <Container sx={{ marginTop: 4, minHeight: '100vh' }} className={mode === 'dark' ? 'dark' : ''}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={classes.input}
          label='Tên'
          variant='outlined'
          {...register('name', { required: true })}
          error={!!errors.name}
          helperText={errors.name && 'Name is required'}
        />
        <TextField
          className={classes.input}
          label='Địa chỉ email'
          variant='outlined'
          type='email'
          {...register('email', { required: true })}
          error={!!errors.email}
          helperText={errors.email && 'Email is required'}
        />
        <TextField
          className={classes.input}
          label='Nội dung'
          variant='outlined'
          multiline
          rows={10}
          {...register('message', { required: true })}
          error={!!errors.message}
          helperText={errors.message && 'Message is required'}
        />
        <Typography variant='body2' color={theme.palette.text.secondary}>
          {
            '* Yêu cầu cấu hình email mặc định trước khi sử dụng tính năng này. Nếu chưa, bạn có thể gửi email tới admin@aichungkhoan.info bằng ứng dụng email yêu thích của mình.'
          }
        </Typography>
        <Button className={classes.button} variant='contained' color='primary' type='submit'>
          Send
        </Button>
      </form>
    </Container>
  );
}

export default Contact;
