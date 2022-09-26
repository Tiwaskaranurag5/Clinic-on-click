package com.coc.utils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;


@Component
public class StorageServiceImpl implements StorageService {
	@Value("${upload.basepath}")
	private String BASEPATH;
	
	
	@Override
	public List<String> loadAll() {
		File dirPath = new File(BASEPATH);
		return List.of(dirPath.list());
		
	}

	@Override
	public String store(MultipartFile file) {
		String fileName = UUID.randomUUID().toString().replaceAll("-", "");
		File renamedfile = new File(BASEPATH, fileName);
		try (FileOutputStream out = new FileOutputStream(renamedfile)) {
			FileCopyUtils.copy(file.getInputStream(), out);
			System.out.println("filename: "+ fileName);
			System.out.println(fileName);
			return fileName;
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Resource load(String fileName) {
		File uploadedFile = new File(BASEPATH, fileName);
		if(uploadedFile.exists()){
			return new FileSystemResource(uploadedFile);
		}
		return null;
	}

	@Override
	public boolean delete(String fileName) {
		File uploadedFile = new File(BASEPATH, fileName);
		if(uploadedFile.exists())
			return uploadedFile.delete();
		return false;
	}

}
