import React, { useState } from "react";
//Components
import { Form, Input, InputNumber, Button, Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
//Functions
import { uploadObject } from "../../utils/FirebaseUploads";

import "./ProductForm.scss";

export default function ProductForm() {
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
    uploadObject(
      object,
      image.fileList[0].originFileObj,
      "products",
      setLoading
    );
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

  //in case it doesnt it returns a false, so when the handleChange is executed it won't add the image
  //to the state.
  const beforeUpload = (file) => {
    if (file.type !== "image/jpeg") {
      message.error("La imagen no es jpeg.");
      return false;
    } else if (file.size > 256000) {
      message.error("El tamaño maximo de imagen es 256KB");
      return false;
    }
    return file.type === "image/jpeg";
  };

  //This handler adds the selected images to the parent state
  const handleChange = async (info) => {
    setImage({ fileList: info.fileList.filter((file) => !!file.status) });
  };

  //This functions eliminates the image from the state when deleted icon is clicked
  const onRemove = () => {
    setImage({ fileList: [] });
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
      <Form name="productForm" onFinish={onFinish}>
        <h3>Cargar Producto</h3>
        <Form.Item
          name="name"
          label="Nombre"
          rules={[
            {
              required: true,
              message: "Debes ingresar el nombre del producto.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Precio"
          rules={[
            {
              required: true,
              message: "Debes ingresar el precio del producto.",
            },
          ]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>
        <Form.Item
          name="picture"
          label="Foto"
          rules={[
            {
              required: true,
              message: "Debes elegir una imagen para el producto.",
            },
          ]}
        >
          <div className="clearfix">
            <Upload
              customRequest={dummyRequest}
              listType="picture-card"
              onRemove={onRemove}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={beforeUpload}
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
            Crear Producto
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
