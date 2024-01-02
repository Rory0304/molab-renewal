'use client';

import React from 'react';

import { enqueueSnackbar } from 'notistack';
import { downloadFile } from 'src/utils/file';

interface NoticeDetailInfoSectionProps {
  content: string;
  attachmentFile?: string | null;
}

const NoticeDetailInfoSection: React.FC<NoticeDetailInfoSectionProps> = ({
  attachmentFile,
  content,
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleFileDownload = async (attachmentFile: string) => {
    setLoading(true);

    try {
      const fileBlob = await downloadFile(
        'notice_attachmentFile',
        attachmentFile
      );

      const downloadUrl = URL.createObjectURL(new Blob([fileBlob]));

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = attachmentFile;

      document.body.appendChild(link);
      link.click();
      link.remove();

      // Clean up by revoking the object URL
      URL.revokeObjectURL(downloadUrl);
      enqueueSnackbar('파일 다운로드에 성공했습니다.', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar('파일 다운로드에 실패했습니다', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8">
      {attachmentFile ? (
        <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
          <p className="text-neutral-500">첨부 파일</p>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleFileDownload(attachmentFile)}
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              '다운로드'
            )}
          </button>
        </div>
      ) : null}
      <div className="py-8 text-lg whitespace-pre-wrap">{content}</div>
    </section>
  );
};

export default NoticeDetailInfoSection;
