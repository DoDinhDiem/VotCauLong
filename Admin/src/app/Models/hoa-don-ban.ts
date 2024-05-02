export interface IHoaDonBan {
  id?: number;
  khachHangId?: number;
  hoTen?: string;
  soDienThoai?: string;
  diaChi?: string;
  ghiChu?: string;
  tongTien?: number;
  trangThaiDonHang?: string;
  trangThaiThanhToan?: boolean;
  phuongThucThanhToan?: string;
  chitiethoadonbans?:
    | {
        sanPhamId?: number;
        soLuong?: number;
        giaBan?: number;
        thanhTien?: number;
      }[]
    | null;
}
