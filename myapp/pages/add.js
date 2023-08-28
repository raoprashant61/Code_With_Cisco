import React, { useState } from 'react';
import styles from '../styles/add.module.css';

let currentName = ""

const TextFileUpload = () => {
  const [file2, setFile2] = useState({ content: '', name: '' });

   
  const handleFileUpload = (event, fileIndex) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const contents = e.target.result;
      const fileName = file.name;
     
        setFile2({ content: contents, name: fileName });
      
    };

    reader.readAsText(file);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    postData("http://localhost:8000/upload",parseTextFile2(file2.content))

  
    // Handle form submission logic here
    // You can access the file contents and names using the state variables (file1, file2)
  };


  

  function parseTextFile2(contents) {
    // Parsing logic for the second file
    var lines = contents.split('\n');
   // var output = document.getElementById('output');
  
    // Perform parsing and output for file 2
    const data = [];
    lines.forEach(function(line) {
      line = line.trim();
  
      // Check if the line starts with "Ip access-list role-based"
      if (line !== '') {
        var parts = line.split(' ');
        var from = parseInt(parts[4]);
        var to = parseInt(parts[6]);
        var type = parts[7];
        const obj = {
          "from":from,
          "to":to,
          "type":type
        }
        data.push(obj);
  
      }
    });
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
          <label htmlFor="file2" className={styles.fileInputLabel}>
            File 2:
          </label>
          <input
            type="file"
            id="file2"
            accept=".txt"
            onChange={(e) => handleFileUpload(e, 2)}
            className={styles.fileInput}
          />
        </div>
        <input type="submit" value="Submit" className={styles.submitButton} />
        {(file2.content) && (
          <div>
            
            {file2.content && (
              <div>
                <h4 className={styles.fileName}>Uploaded File 2: {file2.name}</h4>
                <h4 className={styles.fileContentHeading}>File 2 Contents:</h4>
                <pre className={styles.fileContent}>{file2.content}</pre>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default TextFileUpload;
