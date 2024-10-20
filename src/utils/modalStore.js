import { reactive, ref } from 'vue';

// Tạo reactive object lưu trữ trạng thái của modal
const modal = reactive({
  modalName: null,
  modalParams: {},
});

function openModal(name, params = {}) {
  modal.modalName = name;
  modal.modalParams = params;
}

function closeModal() {
  modal.modalName = null;
  modal.modalParams = {};
}

// Xuất các hàm và trạng thái để sử dụng ở component khác
export { modal, openModal, closeModal };
