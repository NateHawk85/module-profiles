export async function copyToClipboard(text: string): Promise<void>
{
	try
	{
		if (navigator.clipboard)
		{
			await navigator.clipboard.writeText(text);
		} else
		{
			const tempTextArea = document.createElement('textarea');
			tempTextArea.value = text;
			tempTextArea.setAttribute('readonly', '');
			tempTextArea.style.position = 'absolute';
			tempTextArea.style.left = '-99999px';
			tempTextArea.style.top = '-99999px';
			document.body.appendChild(tempTextArea);
			tempTextArea.select();
			document.execCommand('copy');
			document.body.removeChild(tempTextArea);
		}
	} catch (error)
	{
		ui.notifications.error('Unable to copy to clipboard. Please check console for details.');
		console.log(error);
	}
}