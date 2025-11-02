$file = "src\app\page.tsx"
$content = Get-Content $file -Raw
$content = $content -replace '        <HeroBackground\r?\n          name="hyperspeed"\r?\n          intensity=\{intensity\}\r?\n          paused=\{!motionActive\}\r?\n          colorPalette=\{\["#dbeafe", "#93c5fd", "#1d4ed8"\]\}\r?\n          className=\{clsx\(\r?\n            "opacity-100 transition-opacity duration-700",\r?\n            motionActive \? "opacity-100" : "opacity-80",\r?\n          \)\}\r?\n        />', '        <HeroBackground name="hyperspeed" />'
Set-Content $file $content -NoNewline
Write-Host "Fixed HeroBackground in page.tsx"
