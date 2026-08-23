$apiKey = "AIzaSyAVXwyykdwSHfIeAlT5cOh72KRWeBa6Slc"
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=$apiKey"
$body = @{
    contents = @(
        @{
            parts = @(
                @{ text = "Hello" }
            )
        }
    )
} | ConvertTo-Json -Depth 5

try {
    Write-Host "Sending request to $url"
    $response = Invoke-RestMethod -Uri $url -Method Post -ContentType "application/json" -Body $body -ErrorAction Stop
    Write-Host "Success!"
    $response.candidates[0].content.parts[0].text
} catch {
    Write-Host "Error occurred:"
    $_.Exception.Message
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $errBody = $reader.ReadToEnd()
        Write-Host "Full Error Body:"
        Write-Host $errBody
    }
}
