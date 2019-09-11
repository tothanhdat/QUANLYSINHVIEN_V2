// <script>
//   $(document).ready(function(){

//     function getData(){
//       let tenSV, mssv, maKhoa;
//       tenSV = $('#txtHoTen').val();
//       mssv = $('#txtMSSV').val();
//       maKhoa = $('#txtKhoa').val();
//       return { hoTen: tenSV, mssv, maKhoa };
//     }
//     //Hàm check nhập thiếu trường
//     function checkIsvalidate(){
//       let tenSV, mssv, maKhoa;
//       tenSV = $('#txtHoTen').val();
//       mssv = $('#txtMSSV').val();
//       maKhoa = $('#txtKhoa').val();
//       if(tenSV=="" || mssv=="" || maKhoa=="")
//         return true;
//       return false;
//     }
//     $('#btnLuu').click(function(e) {
//       e.preventDefault();
//       let data = getData();
//       let checkData = checkIsvalidate();
//         if(checkData)
//           return alert("Vui long nhap day du thong tin");
//       //Xử lý Ajax để push data
//       $.ajax({
//         method: 'post',
//         url: "/sinhvien/add", 
//         data: data,
//         success: function(data) {
//           if(!data.error)
//             alert("Them Thanh Cong");
//         },
//         error: function(error){
//           console.log(error.message);
//         }
//       });
//     });
//   })
// </script>