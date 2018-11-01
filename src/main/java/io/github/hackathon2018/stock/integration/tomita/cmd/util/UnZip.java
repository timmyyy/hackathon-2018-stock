package io.github.hackathon2018.stock.integration.tomita.cmd.util;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * UnZip -- print or unzip a JAR or PKZIP file using java.util.zip. Command-line
 * version: extracts files.
 */
public class UnZip
{
	private static final Logger log = LoggerFactory.getLogger(UnZip.class);

	/** Constants for mode listing or mode extracting. */
	public static final int LIST = 0;
	public static final int EXTRACT = 1;

	/** Whether we are extracting or just printing TOC */
	private int mode = LIST;
	private ZipInputStream zipInputStream;
	/** Cache of paths we've mkdir()ed. */
	private SortedSet<String> dirsMade;
	private boolean warnedMkDir = false;
	private String baseDir = "";

	/** Set the Mode (list, extract). */
	public void setMode(int m)
	{
		if (m == LIST || m == EXTRACT) mode = m;
	}

	public void setBaseDir(String dir)
	{
		baseDir = dir.endsWith("\\") || dir.endsWith("/") ? dir : (dir + "/");
	}

	/** For a given Zip file, process each entry.
	 * @throws IOException */
	public void unZip(String fileName) throws IOException
	{
		InputStream inputStream = new BufferedInputStream(new FileInputStream(fileName));
		unZip(inputStream);
	}

	public void unZip(InputStream inputStream) throws IOException
	{
		dirsMade = new TreeSet<String>();
		zipInputStream = new ZipInputStream(inputStream);
		try
		{
			ZipEntry entry = null;
			while ((entry = zipInputStream.getNextEntry()) != null) getFile(entry);
		}
		finally
		{
			zipInputStream.close();
		}
	}

	/**
	 * Process one file from the zip, given its name. Either print the name, or
	 * create the file on disk.
	 */
	private void getFile(ZipEntry e) throws IOException
	{
		String zipName = e.getName();
		switch (mode)
		{
			case EXTRACT:
				if (zipName.startsWith("/"))
				{
					if (!warnedMkDir) log.info("Ignoring absolute paths");
					warnedMkDir = true;
					zipName = zipName.substring(1);
				}
				// if a directory, just return. We mkdir for every file,
				// since some widely-used Zip creators don't put out
				// any directory entries, or put them in the wrong place.
				if (zipName.endsWith("/"))
					return;

				// Else must be a file; open the file for output
				// Get the directory part.
				zipName = baseDir + zipName;
				int ix = zipName.lastIndexOf('/');
				if (ix > 0)
				{
					String dirName = zipName.substring(0, ix);
					if (!dirsMade.contains(dirName))
					{
						File d = new File(dirName);
						// If it already exists as a dir, don't do anything
						if (!(d.exists() && d.isDirectory()))
						{
							// Try to create the directory, warn if it fails
								log.debug("Creating Directory: " + dirName);
							if (!d.mkdirs())
								log.error("Warning: unable to mkdir " + dirName);
							dirsMade.add(dirName);
						}
					}
				}
					log.debug("Creating " + zipName);
				FileOutputStream os = new FileOutputStream(zipName);
				try
				{
					InputStream is = zipInputStream;
					int n = 0;
					byte[] b = new byte[8092];
					while ((n = is.read(b)) > 0)
						os.write(b, 0, n);
				}
				finally
				{
					os.close();
				}
				break;
			case LIST:
				// Not extracting, just list
				if (e.isDirectory())
					log.info("Directory " + zipName);
				else
					log.info("File " + zipName);
				break;
			default:
				throw new IllegalStateException("mode value (" + mode + ") bad");
		}
	}

	/**
	 * Simple main program, construct an UnZipper, process each .ZIP file from
	 * argv[] through that object.
	 * @throws IOException
	 */
	public static void main(String[] argv) throws IOException
	{
		UnZip u = new UnZip();

		for (int i = 0; i < argv.length; i++)
		{
			if ("-x".equals(argv[i]))
			{
				u.setMode(EXTRACT);
				continue;
			}
			String candidate = argv[i];
			// System.err.println("Trying path " + candidate);
			u.unZip(candidate);
		}
		log.info("All done!");
	}
}
