Get-ChildItem -Path . -Filter *.html -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace 'lalpathlabs\.com', 'maxpathlab.com'
    Set-Content $_.FullName $content
}
