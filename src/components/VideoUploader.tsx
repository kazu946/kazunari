import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, FileVideo } from 'lucide-react';

interface VideoUploaderProps {
  onVideoUploaded: (stepId: number, videoFile: File) => void;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({ onVideoUploaded }) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{[key: string]: 'uploading' | 'success' | 'error'}>({});

  const videoSteps = [
    { id: 0, name: 'step1-kokoro-gamae.mp4', title: '心構えと基本姿勢' },
    { id: 1, name: 'step2-mokuzai-sentei.mp4', title: '木材の選定と観察' },
    { id: 2, name: 'step3-sumitsuke.mp4', title: '墨付けの極意' },
    { id: 3, name: 'step4-nomi-tsukai.mp4', title: 'ノミの扱い方' },
    { id: 4, name: 'step5-shiguchi-kakou.mp4', title: '仕口加工の実践' },
    { id: 5, name: 'step6-hinshitsu-kensa.mp4', title: '品質検査と調整' },
    { id: 6, name: 'step7-gijutsu-keishou.mp4', title: '技術の継承' }
  ];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
      if (file.type.startsWith('video/')) {
        processVideoFile(file);
      }
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      if (file.type.startsWith('video/')) {
        processVideoFile(file);
      }
    });
  };

  const processVideoFile = (file: File) => {
    const fileName = file.name.toLowerCase();
    const matchedStep = videoSteps.find(step => 
      fileName.includes(step.name.replace('.mp4', '')) || 
      fileName.includes(`step${step.id + 1}`)
    );

    if (matchedStep) {
      setUploadStatus(prev => ({ ...prev, [matchedStep.name]: 'uploading' }));
      
      // 実際のアップロード処理をシミュレート
      setTimeout(() => {
        onVideoUploaded(matchedStep.id, file);
        setUploadStatus(prev => ({ ...prev, [matchedStep.name]: 'success' }));
      }, 2000);
    } else {
      setUploadStatus(prev => ({ ...prev, [file.name]: 'error' }));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
      <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center">
        <FileVideo className="w-6 h-6 mr-2" />
        動画ファイル管理
      </h3>

      {/* ドラッグ&ドロップエリア */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          dragOver 
            ? 'border-amber-400 bg-amber-50' 
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
      >
        <Upload className={`w-12 h-12 mx-auto mb-4 ${dragOver ? 'text-amber-600' : 'text-gray-400'}`} />
        <p className="text-lg font-medium text-gray-700 mb-2">
          動画ファイルをドラッグ&ドロップ
        </p>
        <p className="text-sm text-gray-500 mb-4">
          または
        </p>
        <label className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg cursor-pointer inline-block transition-colors">
          ファイルを選択
          <input
            type="file"
            multiple
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>
      </div>

      {/* 必要な動画ファイル一覧 */}
      <div className="mt-6">
        <h4 className="font-medium text-gray-800 mb-3">必要な動画ファイル:</h4>
        <div className="space-y-2">
          {videoSteps.map((step) => (
            <div key={step.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">{step.title}</p>
                <p className="text-sm text-gray-500">{step.name}</p>
              </div>
              <div className="flex items-center">
                {uploadStatus[step.name] === 'uploading' && (
                  <div className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                )}
                {uploadStatus[step.name] === 'success' && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {uploadStatus[step.name] === 'error' && (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 使用方法 */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">動画ファイルの準備方法:</h4>
        <ol className="text-sm text-blue-800 space-y-1">
          <li>1. daiku_video_pack.zipを解凍</li>
          <li>2. 各ステップに対応する動画ファイルを上記にドラッグ&ドロップ</li>
          <li>3. ファイル名が自動認識され、適切なステップに割り当てられます</li>
          <li>4. アップロード完了後、チュートリアルで実際の動画が再生されます</li>
        </ol>
      </div>
    </div>
  );
};