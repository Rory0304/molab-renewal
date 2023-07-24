"use client";

import React from "react";

const ProposeUnsaveModal: React.FC = () => {
  return (
    <dialog id="propose-unsave-modal" className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="text-lg font-bold">변경 내용 저장</h3>
        <p className="py-4">
          저장되지 않은 변경 사항이 있습니다. 계속하려면 변경 사항을 저장하세요.
        </p>
        <div className="modal-action">
          <button type="button" className="btn">
            변경 내용 삭제
          </button>
          <button type="button" className="btn">
            저장
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default ProposeUnsaveModal;
