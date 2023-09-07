import AWS from "aws-sdk";
import React, { useEffect, useState } from "react";
import './App.css';
import Modal from "./Modal.js";

function App() {

  const [myBucket, setMyBucket] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const apiUrl = 'http://127.0.0.1:5000/get_cert';
  const [certValue, setCertValue] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0); // 업로드 프로그래스 상태 추가
  const [fileList, setFileList] = useState([]); // 파일 목록 상태 추가
  const [uploadMessage, setUploadMessage] = useState(null);

  function closeModal() {
    setShowModal(false);
  }

  const handleS3UploadClick = () => {
    if (selectedFile) {
      // 파일이 선택된 경우에만 S3로 전송
      uploadFile(selectedFile);
      setTimeout(() => {
        alert("업로드가 완료되었습니다.");
      }, 1000);
    } else {
      // 파일이 선택되지 않은 경우 경고창 표시
      alert('파일을 먼저 등록하세요.');
    }
  };

    //최초로 실행될때 딱 1번만 호출: AWS 암호키 장착 -> s3로 파일 전송 가능
  useEffect(()=> {
    
    //1. AWS 키 생성
    AWS.config.update({
      accessKeyId: "*******",
      secretAccessKey: "******",
    })

    const myBucket = new AWS.S3({
      params: {Bucket: "s3-driver-upload"},
      region:"ap-northeast-2" //서울에서 생성
    })

    setMyBucket(myBucket);

  
    // fetch 함수를 사용하여 API에 GET 요청을 보냅니다.
    fetch(apiUrl)
    .then(response => {
      // HTTP 응답을 JSON으로 파싱합니다.
      return response.json();
    })
    .then(data => {
      // 서버에서 받은 데이터를 처리합니다.
      const certValue = data.cert;
      setCertValue(certValue); // cert 값을 가져옵니다.

      // 이제 cert 값을 사용하여 웹 페이지에서 원하는 동작을 수행할 수 있습니다.
      if (certValue) {
        console.log("등록된 사람입니다");
      } else {
        console.log("미등록된 사람입니다");
      }
    })
    .catch(error => {
      console.error('API 호출 중 오류:', error);
    });
 
  }, []);

  //1.내컴퓨터에 파일 장착
  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.add("drag-over");
  }

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove("drag-over");

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setSelectedFile(droppedFile);
      uploadFile(droppedFile); // Upload the dropped file to S3
      const fileInfo = `파일 이름: ${droppedFile.name}`;
      setUploadMessage(`업로드 완료 - ${fileInfo}`);
    
    }

    
  }


//2.앞에서 장착한 그 파일을 s3로 전송
  const uploadFile = (file) => {
    if(!file){
      console.log("파일이 선택되지 않았습니다.");
      return;
    }

    // a. aws가 시킨 양식을 따라야 함
    const param = {
      ACL:"public-read",
      ContentType: "image/jpeg",
      Body: file,
      Bucket: "s3-driver-upload",
      Key: "upload/" + file.name //보통은 file.name이라고 하면 파일명이 중복되서 덮어씌우기가 많이 되므로 UUID+파일명 형태로 저장한 뒤 그걸 DB에 저장해야함.(고칠필요)
    }

    //b. aws가 정한 양식을 보내기
      myBucket
      .putObject(param)
        .on("httpUploadProgress",(progress)=> {
          const percentProgress = Math.round((progress.loaded / progress.total)* 100);
          setUploadProgress(percentProgress);
        })
      .send((err,data)=> {
        console.log("data: ",data);
        
        if (err) {
          console.log(err);
        } else{
          const url = myBucket.getSignedUrl("getObject",{Key:param.Key});
          console.log("url:", url);
        }
      })

  }


    // S3에서 파일 목록을 가져와 fileList 상태에 설정
    const listS3Files = () => {
      if (myBucket) {
        const params = {
          Bucket: "s3-driver-upload",
        };
    
        myBucket.listObjectsV2(params, (err, data) => {
          if (err) {
            console.error("S3 파일 목록 가져오기 오류:", err);
          } else {
            console.log("S3 파일 목록:", data.Contents);
            // FileList를 배열로 변환하여 fileList 상태에 설정
            setFileList(Array.from(data.Contents));
          }
        });
      } else {
        console.error("myBucket이 아직 설정되지 않았습니다.");
      }
    };
  
    useEffect(() => {
      listS3Files();
    }, []); // 페이지가 로드될 때 한 번 호출

  return (
    <div>
      <body className="bigbox">
        {showModal && (
          <Modal closeModal={closeModal}>
            {/* 모달 내용 */}
            <h1>카쉐어링 운전자 확인 시스템</h1>
            <p>: 카쉐어링 서비스 중 발생할 수 있는 운전사고에 대처하기 위해 AI영상 인식 기술을 활용하여 운전자 얼굴 식별 및 확인 서비스 개발을 위해 이미지를 업로드 하는 사이트 입니다.</p>
            <li>파일 확장자는 jpg만 가능합니다.</li>
            <li>결과가 나오는데 시간이 걸리므로 기다려주세요!</li>
          </Modal>
        )}
        <div className="binbox"></div>
        <div className="middlebox">
          <div className="first"><div className="back1"/></div>
          <div className="middleboxcolor">
            <div className="binbinbox"></div>
            <div className="head"> UPLOAD YOUR FACEPHOTO</div>
            <div class="jb-division-line"></div>
            <div className="body">
              <div className="bodyfirst">
                <div className="blank"></div>
                  <div className = 'explain'>
                  </div>
                  <div classname='content'>
                  <div className="drop-area"  onDragOver={handleDragOver} onDrop={handleDrop} >
                    {uploadMessage ? (
                      <div className="upload-message">
                        <p>{uploadMessage}</p>
                      <p className="drag">파일을 다시 업로드하려면 드래그하세요</p>
                    </div>
                    ):(
                      <p className="upload-mesage">파일을 드래그하여 업로드하세요</p>
                    )}
                    </div>
                    {/* 프로그래스 바 또는 퍼센트를 표시할 요소 추가 */}
                    <div className='progress-bar'>
                      <div className='progress' style={{ width: `${uploadProgress}%` }}>{uploadProgress}%</div>
                    </div>
                    <div className = 'box'>
                      <div className = 'uploader'>
                        <br></br>
                          <div class = "filebox">
                          <div>
                            <input className="upload-name" type="file" id="fileInput" onChange={handleFileInput} style={{ display: 'none' }} />
                            <button class="w-btn w-btn-indigo" onClick={() => {uploadFile(selectedFile); handleS3UploadClick();}}>S3로 파일 전송</button>  {/*2. 앞에서 장착한 그 파일을 s3로 전송*/}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <div className="bodysecond">
                <h4> 결과:
                    <div>
                      {/* certValue 값에 따라 다른 내용 표시 */}
                      {certValue !== null ? (
                        certValue ? (
                          <p>등록된 사람입니다</p>
                        ) : (
                          <p>미등록된 사람입니다</p>
                        )
                      ) : (
                        <p>...</p>
                      )}
                    </div>
                </h4>
                <div className="filelist">
                  <button onClick={listS3Files} class="w-btn w-btn-indigo">저장된 파일목록 </button>
                  <ul>
                    {fileList.map((file,index)=> (
                      <li key={index}>
                        {file.Key}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="third"><div className="back"/></div>
        </div>
        <div className="copyright">개발자: 김재광, 김한결, 김민경, 박소윤</div>
      </body>
    </div>
  );
}


export default App;
