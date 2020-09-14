import React, { useState } from "react";
//Components
import { Form, Button, Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { uploadObject } from "../../utils/FirebaseUploads";

import "./SlideForm.scss";

export default function SlideForm() {
  const [image, setImage] = useState({ fileList: [] });
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  const onFinish = (object) => {
    setLoading(true);
    //Asignating Image name to Product object
    object.picture = image.fileList[0].uid;
    //Generating a random number
    object.random = Math.random();
    //This function uploads the object and the image
    uploadObject(object, image.fileList[0].originFileObj, "slides", setLoading);
  };

  //This functions gets the base64 from the selected file to get the image
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  //Functions
  const handleCancel = () => setPreviewVisible(false);

  //This function is executed when clicking on image to show it's preview
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.preview);
    setPreviewVisible(true);
  };

  //This handler adds the selected images to the parent state
  const handleChange = ({ fileList }) => {
    setImage({ fileList });
  };

  //This function is to override the automatic POST request sent by
  //antd Uploader, to avoid uploading images until form is done
  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <div className="form">
      <Form name="slideForm" onFinish={onFinish}>
        <h3>Cargar Slide</h3>
        <Form.Item
          name="picture"
          label="Foto"
          rules={[
            {
              required: true,
              message: "Debes elegir una foto para el slide.",
            },
          ]}
        >
          <div className="clearfix">
            <Upload
              customRequest={dummyRequest}
              listType="picture-card"
              onPreview={handlePreview}
              onChange={handleChange}
              fileList={image.fileList}
            >
              {image.fileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div className="ant-upload-text">Subir Imagen</div>
                </div>
              )}
            </Upload>
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </div>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Crear Slide
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
