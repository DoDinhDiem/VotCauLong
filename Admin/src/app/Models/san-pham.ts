export interface ISanPham {
  id?: number;
  loaiId?: number;
  thuonghieuId?: number;
  tenSanPham?: string;
  moTa?: string;
  giaNiemYet?: number;
  phanTramGiam?: number;
  soLuong?: number;
  trangThai?: boolean;
  anhsanphams?:
    | {
        image?: string;
        trangThai?: boolean;
      }[]
    | null;
}
