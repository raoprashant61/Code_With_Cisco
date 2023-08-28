import React, { useState } from 'react';
import styles from '../styles/add_rules.module.css';

let currentName = ""

const TextFileUpload = () => {
  const [file1, setFile1] = useState({ content: '', name: '' });

   
  const handleFileUpload = (event, fileIndex) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const contents = e.target.result;
      const fileName = file.name;
      if (fileIndex === 1) {
        setFile1({ content: contents, name: fileName });

      } 
    };

    reader.readAsText(file);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    //postData("http://localhost:8000/upload",parseTextFile2(file2.content))
    postData("http://localhost:8000/service",parseTextFile1(file1.content))

  
    // Handle form submission logic here
    // You can access the file contents and names using the state variables (file1, file2)
  };


  function parseTextFile1(contents) {
    
    // Parsing logic for the first file
    var lines = contents.split('\n');
  
    // Perform parsing and output for file 1
    const data = [];
    let rule={service:"",permit:[],deny:[]};
    lines.forEach(function(line) {
      line = line.trim();
  
      // Check if the line starts with "Ip access-list role-based"
      if (line.startsWith('Ip access-list role-based')) {
        if(rule.service.length>0){
          data.push(rule);
        }
        rule={service:"",permit:[],deny:[]};
        var parts = line.split(' ');
        currentName = parts[3];
        rule.service=currentName;
      } 
      else if (line !== '') {
        var parts = line.split(' ');
        var action = parts[1];
        var service = parts[2];
        if(action=="permit")
          rule.permit.push(service);
        else
          rule.deny.push(service);
      }
    });
    if(rule.service.length>0) data.push(rule);
    return data;
  }




  const postData = async (url,text) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(text)
      });

      if (response.ok) {
        console.log('Data successfully posted to API.');
      } else {
        console.error('Failed to post data to API.');
      }
    } catch (error) {
      console.error('Error posting data to API:', error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <h3 className={styles.heading}>Text File Upload</h3>
        <div className={styles.fileInputContainer}>
          <label htmlFor="file1" className={styles.fileInputLabel}>
            File 1:
          </label>
          <input
            type="file"
            id="file1"
            accept=".txt"
            onChange={(e) => handleFileUpload(e, 1)}
            className={styles.fileInput}
          />
        </div>
   
        <input type="submit" value="Submit" className={styles.submitButton} />
        {(file1.content) && (
          <div>
            {file1.content && (
              <div>
                <h4 className={styles.fileName}>Uploaded File 1: {file1.name}</h4>
                <h4 className={styles.fileContentHeading}>File 1 Contents:</h4>
                <pre className={styles.fileContent}>{file1.content}</pre>
              </div>
            )}
    
          </div>
        )}
      </form>
    </div>
  );
};

export default TextFileUpload;
